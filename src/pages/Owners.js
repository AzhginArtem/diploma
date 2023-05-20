import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Owners = observer(() => {
  const { user, data } = useContext(Context);

  const getOwners = async () => {
    const order = await getSmth('owner', 1);
    data.setOwners(order);
  };

  useEffect(() => {
    getOwners();
  }, []);

  return Object.keys(data.owners).length !== 0 ? (
    <div className="owners">
      {data.owners.map((owner) => (
        <div className="owners__block">
          <h1 className="owners__title">{owner.FIO}</h1>
          <p className="owners__subtitle">
            <b>Возраст: </b>
            {owner.Age}
          </p>
          <p className="owners__subtitle">
            <b>Телефон: </b>
            {owner.Phone}
          </p>
          <p className="owners__subtitle">
            <b>E-mail: </b>
            {owner.Email}
          </p>
          {user.user.role === 'ADMIN' ? <ControlPanel table="owners" obj={owner} /> : ''}
        </div>
      ))}
    </div>
  ) : (
    ''
  );
});

export default Owners;
