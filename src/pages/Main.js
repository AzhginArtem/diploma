import React, { useEffect, useContext, useState } from 'react';
import { Context } from '..';
import './pages.sass';
import { observer } from 'mobx-react';

const Main = observer(() => {
  const { user } = useContext(Context);

  return <div className="main"></div>;
});

export default Main;
