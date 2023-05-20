import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Objects = observer(({ currentPage }) => {
  const { user, data } = useContext(Context);

  const getObjects = async () => {
    let objects = await getSmth('object', 1);
    data.setObjects(objects);
  };

  useEffect(() => {
    getObjects();
  }, []);

  return (
    <div className="objects">
      {Object.keys(data.objects).length !== 0
        ? data.objects.map((object) => {
            return (
              <div key={object.ID} className="objects__block">
                <div className="objects__txt">
                  <h1 className="objects__title">{object.Name}</h1>
                  <p className="objects__subtitle">
                    <b>Адрес:</b> {object.Address}
                  </p>
                  <p className="objects__subtitle">
                    <b>Площаль:</b> {object.Square}
                  </p>
                  <p className="objects__subtitle">
                    <b>Владелец:</b> {object.owner === null ? 'Неизвестно' : object.owner.FIO}
                  </p>
                </div>
                {user.user.role === 'ADMIN' ? <ControlPanel table="object" obj={object} /> : ''}
              </div>
            );
          })
        : 'Извините!'}
    </div>
  );
});

export default Objects;
