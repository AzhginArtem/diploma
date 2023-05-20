import React, { useContext } from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router';
import { AUTH_ROUTE } from '../store/consts';

const Admin = () => {
  const { user } = useContext(Context);
  const navigator = useNavigate();

  const handleQuit = async () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    navigator(AUTH_ROUTE);
  };

  return (
    <div className="admin">
      <h1 className="admin__title">Личный кабинет</h1>
      <div className="admin__container">
        {Object.keys(user.user).map((value) => (
          <p key={value} className="admin__subtitle">
            <b>{value}</b>: {user.user[value]}
          </p>
        ))}
        <button className="admin__btn" onClick={handleQuit}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Admin;
