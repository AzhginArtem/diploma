import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Users = observer(() => {
  const { user, data } = useContext(Context);

  const getUsers = async () => {
    let order = await getSmth('user', 1);
    data.setUsers(order);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users">
      {Object.keys(data.users).length !== 0
        ? data.users.map((dbUser) => {
            return (
              <div key={dbUser.ID} className="users__block">
                <div className="users__txt">
                  <h1 className="users__title">{dbUser.FIO}</h1>
                  <p className="users__subtitle">
                    <b>Возраст:</b> {dbUser.Age}
                  </p>
                  <p className="users__subtitle">
                    <b>Телефон:</b> {dbUser.Phone}
                  </p>
                  <p className="users__subtitle">
                    <b>Email:</b> {dbUser.Email}
                  </p>
                </div>
                {user.user.role === 'ADMIN' ? <ControlPanel table="user" obj={user} /> : ''}
              </div>
            );
          })
        : 'Извините!'}
    </div>
  );
});

export default Users;
