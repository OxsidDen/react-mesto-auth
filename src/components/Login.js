import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function Login({handleLogin}) {
  const [isInfoToolOpen, setInfoToolOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err)
        setInfoToolOpen(true)
      });
  }
  function handleCloseTool(){
    setInfoToolOpen(false)
  }
    return(
      <>
        <form className="login" onSubmit={handleSubmit} >
          <h1 className='login__title'>Вход</h1>
          <input className='login__input' placeholder='Email' name ="email" type="email" value={formValue.email} onChange={handleChange} ></input>
          <input className='login__input' placeholder='Пароль' name ="password" type ="password" value={formValue.password} onChange={handleChange}></input>
          <button className='login__button' type='submit' onSubmit={handleSubmit}>Войти</button>
        </form>
        <InfoTooltip
          isOpen={isInfoToolOpen}
          onClose={handleCloseTool}
          isCorect={false}
        />
      </>
      
    )
}


export default Login;