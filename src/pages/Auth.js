import React from 'react'
import MainForm from '../components/MainForm/MainForm'
import { observer } from 'mobx-react';
import Logo from '../assets/logo.svg'

const Auth = observer(() => {
  return (<>
    <img src={Logo} alt="Logo" />
    <MainForm/>
  </>
  )
});

export default Auth