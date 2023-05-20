import React, { useContext, useState, useEffect } from 'react';
import { registration, logIn } from '../../http/userAPI';
import { useNavigate } from 'react-router';
import './MainForm.sass';
import { Context } from '../../index';
import { MAIN_ROUTE } from '../../store/consts';
import { observer } from 'mobx-react';

const MainForm = observer(() => {
  const { user } = useContext(Context);
  const navigator = useNavigate();
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [FIO, setFIO] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user.isAuth) navigator(MAIN_ROUTE);
  });

  const signIn = async (e) => {
    e.preventDefault();
    let response;
    if (isLogin) {
      response = await logIn(FIO, password);
    } else {
      response = await registration(FIO, password, age, phone, email);
    }
    if (response && typeof user === 'object') {
      delete response.exp;
      delete response.iat;
      user.setUser(response);
      user.setIsAuth(true);
      navigator(MAIN_ROUTE);
    }
  };

  return (
    <form action="" method="post" className="form">
      <label htmlFor="fio" className="form__title">
        Введите ФИО:
      </label>
      <input
        type="text"
        name="fio"
        value={FIO}
        onChange={(e) => setFIO(e.target.value)}
        className="form__input"
      />

      <label htmlFor="pass" className="form__title">
        Введите пароль:
      </label>
      <input
        type="password"
        name="pass"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form__input"
      />
      {!isLogin && (
        <>
          <label htmlFor="age" className="form__title">
            Введите возраст:
          </label>
          <input
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form__input"
          />

          <label htmlFor="phone" className="form__title">
            Введите телефон:
          </label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form__input"
          />

          <label htmlFor="email" className="form__title">
            Введите Email:
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form__input"
          />
        </>
      )}

      {!isLogin ? (
        <>
          <input
            type="button"
            value="Зарегистрироваться!"
            className="form__btn active"
            onClick={signIn}
          />
          <input
            type="button"
            value="Войти!"
            className="form__btn"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(true);
            }}
          />
        </>
      ) : (
        <>
          <input type="button" value="Войти!" className="form__btn active" onClick={signIn} />
          <input
            type="button"
            value="Зарегистрироваться!"
            className="form__btn"
            onClick={(e) => {
              setIsLogin(false);
            }}
          />
        </>
      )}
    </form>
  );
});

export default MainForm;
