import { useContext, useState } from 'react';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ControlPanel.sass';
import { getSmth } from '../../http/userAPI';
import { $authHost } from '../../http';
import { Context } from '../..';
import Modal from '../Modal/Modal';

export default function ControlPanel(props) {
  const { user, data } = useContext(Context);
  const [choosed, setChoosed] = useState('');

  const showResult = async (response) => {
    switch (props.table) {
      case 'object':
        if (response.status === 200) {
          alert('Объет ' + props.obj.Name + ' был успешно изменен!');
          let response = await getSmth(props.table, props.obj.ID);
          data.setObjects(response);
        }
        break;
      case 'owner':
        if (response.status === 200) {
          alert('Заказчик ' + props.obj.FIO + ' был успешно изменен!');
          let response = await getSmth(props.table, props.obj.ID);
          data.setOwners(response);
        }
        break;
      case 'contract':
        if (response.status === 200) {
          alert('Контракт ' + props.obj.Name + ' был успешно изменен!');
          let response = await getSmth(props.table, user.user.id);
          data.setContracts(response);
        }
        break;
      case 'service':
        if (response.status === 200) {
          alert('Услуга ' + props.obj.Name + ' была успешно изменен!');
          let response = await getSmth(props.table, props.obj.ID);
          data.setServices(response);
        }
        break;
      case 'user':
        if (response.status === 200) {
          alert('Сотрудник ' + props.obj.Name + ' был успешно изменен!');
          let response = await getSmth(props.table, props.obj.ID);
          data.setUsers(response);
        }
        break;
      default:
        break;
    }
  };

  const handleDeleteClick = async () => {
    const id = props.obj.ID;
    const response = await $authHost.post(`api/${props.table}/delete`, { id });
    showResult(response);
  };

  const handleModalTrigger = async () => {
    document.querySelectorAll('.modal').forEach((elem) => {
      elem.classList.remove('show');
    });
    document.getElementById(props.obj.ID).classList.add('show');
  };

  return (
    <>
      <Modal obj={props.obj} choosed={choosed} table={props.table} />

      <div className="control">
        <FontAwesomeIcon
          onClick={handleDeleteClick}
          icon={faTrash}
          size="lg"
          style={{ color: '#ff2929' }}
        />

        <FontAwesomeIcon
          icon={faPen}
          size="lg"
          style={{ color: '#313ff6' }}
          onClick={() => {
            setChoosed('edit');
            handleModalTrigger();
          }}
        />
        {props.table !== 'user' && (
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            style={{ color: '#1fe03f' }}
            onClick={() => {
              setChoosed('add');
              handleModalTrigger();
            }}
          />
        )}
      </div>
    </>
  );
}
