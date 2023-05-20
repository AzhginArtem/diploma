import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import Modal from '../components/Modal/Modal';

const Contracts = observer(() => {
  const { user, data } = useContext(Context);

  const getContracts = async () => {
    let order = await getSmth('contract', user.user.id);
    data.setContracts(order);
  };

  const handleModalTrigger = async () => {
    document.querySelectorAll('.modal').forEach((elem) => {
      elem.classList.remove('show');
    });
    document.querySelector('.modal').classList.add('show');
  };

  useEffect(() => {
    getContracts();
  }, []);

  return (
    <div className="main">
      {Object.keys(data.contracts).length !== 0 ? (
        data.contracts.map((contract) => {
          return (
            <div key={contract.ID} className="main__block">
              <img
                src={'http://localhost:987/api/' + contract.Image}
                alt="Договор"
                className="main__img"
              />
              <div className="main__txt">
                <h1 className="main__title">{contract.object.Name}</h1>
                <p className="main__subtitle">
                  <b>Владелец:</b> {contract.owner.FIO}
                </p>
                <p className="main__subtitle">
                  <b>Тип:</b> {contract.type !== null ? contract.type.Name : 'отсутствует'}
                </p>
                <p className="main__subtitle">
                  <b>Услуги:</b>{' '}
                  {contract.services.map((service, i) =>
                    i === contract.services.length - 1 ? `${service.Name}.` : `${service.Name}, `,
                  )}
                </p>
                <p className="main__subtitle">
                  <b>Сумма: </b> {contract.Summary}
                </p>
              </div>
              <ControlPanel table="contract" obj={contract} />
            </div>
          );
        })
      ) : (
        <div>
          <h1>У вас пока нет контрактов!</h1>
          <button onClick={handleModalTrigger}>Создать!</button>
          <Modal
            obj={{
              ID: 3,
              Summary: 12000,
              Image: 'sosedi.jpg',
              objectID: 3,
              typeID: 7,
              userID: 1,
              serviceID: 3,
              ownerID: 2,
              owner: {
                FIO: 'Демидов Илья Максимович',
              },
              object: {
                Name: 'Соседи',
              },
              type: {
                Name: 'Открыт',
              },
              services: [
                {
                  Name: 'Изыскания геодезические',
                  service_contract: {
                    ID: 3,
                    createdAt: '2023-05-07T00:00:00.000Z',
                    updatedAt: '2023-05-07T00:00:00.000Z',
                    contractID: 3,
                    serviceID: 3,
                  },
                },
              ],
            }}
            choosed={'add'}
            table={'contract'}
          />
        </div>
      )}
    </div>
  );
});

export default Contracts;
