import { useEffect, useContext } from 'react';
import { Context } from '..';
import { getSmth } from '../http/userAPI';
import './pages.sass';
import { observer } from 'mobx-react';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Services = observer(() => {
  const { user, data } = useContext(Context);

  const getServices = async () => {
    let order = await getSmth('service', 1);
    data.setServices(order);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="services">
      {Object.keys(data.services).length !== 0
        ? data.services.map((service) => {
            return (
              <div key={service.ID} className="services__block">
                <h1 className="services__title">{service.Name}</h1>
                {user.user.role === 'ADMIN' ? <ControlPanel obj={service} table="service" /> : ''}
              </div>
            );
          })
        : 'Извините!'}
    </div>
  );
});

export default Services;
