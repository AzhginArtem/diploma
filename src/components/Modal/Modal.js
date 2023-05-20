import { $authHost } from '../../http';
import { getSmth } from '../../http/userAPI';
import { useContext } from 'react';
import { Context } from '../..';

export default function Modal({ obj, choosed, table }) {
  const { user, data } = useContext(Context);
  const showResult = async (response) => {
    switch (table) {
      case 'object':
        if (response.status === 200) {
          alert('Объет ' + obj.Name + ' был успешно изменен!');
          let response = await getSmth(table, obj.ID);
          data.setObjects(response);
        }
        break;
      case 'owner':
        if (response.status === 200) {
          alert('Заказчик ' + obj.FIO + ' был успешно изменен!');
          let response = await getSmth(table, obj.ID);
          data.setOwners(response);
        }
        break;
      case 'contract':
        if (response.status === 200) {
          alert('Контракт ' + obj.Name + ' был успешно изменен!');
          let response = await getSmth(table, user.user.id);
          data.setContracts(response);
        }
        break;
      case 'service':
        if (response.status === 200) {
          alert('Услуга ' + obj.Name + ' была успешно изменен!');
          let response = await getSmth(table, obj.ID);
          data.setServices(response);
        }
        break;
      case 'user':
        if (response.status === 200) {
          alert('Сотрудник ' + obj.Name + ' был успешно изменен!');
          let response = await getSmth(table, obj.ID);
          data.setUsers(response);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    let values = [];
    if (choosed === 'add') {
      document.querySelectorAll(`#id${obj.ID}`).forEach((inp) => {
        values.push(inp.value);
      });
      const response = await $authHost.post(`api/${table}/new`, { values });
      showResult(response);
    } else if (choosed === 'edit') {
      values.push(obj.ID);
      document.querySelectorAll(`#id${obj.ID}`).forEach((inp, i) => {
        if (inp.value !== '') values.push({ [inp.name]: inp.value });
      });
      let response = await $authHost.post(`api/${table}/edit`, { values });
      showResult(response);
    }
    document.querySelectorAll('.modal').forEach((elem) => {
      elem.classList.remove('show');
    });
  };
  return (
    <div className="modal" id={obj.ID}>
      <button
        onClick={(e) => {
          document.querySelectorAll('.modal').forEach((elem) => {
            elem.classList.remove('show');
          });
        }}>
        X: {obj.ID}
      </button>
      {Object.keys(obj).map((value, index) =>
        !value.includes('At') && value !== 'ID' ? (
          <div key={index}>
            <label htmlFor={value}>{value}</label>
            <input name={value} id={'id' + obj.ID}></input>
          </div>
        ) : (
          ''
        ),
      )}
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
}
