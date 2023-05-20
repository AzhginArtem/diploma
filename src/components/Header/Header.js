import Logo from '../../assets/logo.svg';
import './Header.sass';
import { Link } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  CONTRACTS_ROUTE,
  MAIN_ROUTE,
  OBJECTS_ROUTE,
  OWNERS_ROUTE,
  SERVICES_ROUTE,
  TYPES_ROUTE,
  USERS_ROUTE,
  STATS_ROUTE,
} from '../../store/consts';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Context } from '../..';

export default function Header() {
  const { user } = useContext(Context);
  return (
    <div className="header">
      <Link to={MAIN_ROUTE}>
        <img src={Logo} alt="ИнжПроектСервис" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__item">
            <Link to={CONTRACTS_ROUTE}>Мои контракты</Link>
          </li>
          <li className="header__item">
            <Link to={OBJECTS_ROUTE}>Объекты</Link>
          </li>
          <li className="header__item">
            <Link to={OWNERS_ROUTE}>Заказчики</Link>
          </li>
          <li className="header__item">
            <Link to={SERVICES_ROUTE}>Услуги</Link>
          </li>
          <li className="header__item">
            <Link to={TYPES_ROUTE}>Типы контрактов</Link>
          </li>
          <li className="header__item">
            <Link to={USERS_ROUTE}>Сотрудники</Link>
          </li>
          {user.user.role === 'ADMIN' && (
            <li className="header__item">
              <Link to={STATS_ROUTE}>Статистика</Link>
            </li>
          )}
          <li className="header__item">
            <Link to={ADMIN_ROUTE}>
              <FontAwesomeIcon icon={faUser} style={{ color: '#fff' }} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
