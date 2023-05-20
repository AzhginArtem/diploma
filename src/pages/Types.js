import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Types = observer(() => {
  const { data } = useContext(Context);

  const getTypes = async () => {
    let response = await getSmth('type', 1);
    data.setTypes(response);
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className="types">
      {Object.keys(data.types).length !== 0
        ? data.types.map((type) => {
            return (
              <div key={type.ID} className="types__block">
                <h1 className="types__title">{type.Name}</h1>
              </div>
            );
          })
        : 'Извините!'}
    </div>
  );
});

export default Types;
