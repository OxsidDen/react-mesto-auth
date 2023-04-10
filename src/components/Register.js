import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  const [isInfoToolOpen, setInfoToolOpen] = useState(false)
    const [formValue, setFormValue] = useState({
      email: '',
      password: '',
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
      auth.register(  formValue.email, formValue.password)
      .then(() => {
        setInfoToolOpen(true)
      })
        .catch((err) => {
          console.log(err)
        })
    }
    function handleCloseTool(){
      setInfoToolOpen(false)
      navigate('/sign-in', {replace: true})
    }
    return(
      <>
        <form className="register" onSubmit={handleSubmit}>
          <h1 className='register__title'>Регистрация</h1>
          <input className='register__input' id="email" placeholder='Email' name="email" type="email" value={formValue.email} onChange={handleChange}></input>
          <input className='register__input' id="password" placeholder='Пароль' name="password" type="password" value={formValue.password} onChange={handleChange}></input>
          <button className='register__button' type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
          <div className='register__signin'>
              <p className='register__login-text'>Уже зарегистрированы?</p>
              <Link to="/sign-in" className='register__login-link'>Войти</Link>
          </div>
        </form>
        <InfoTooltip
          isOpen={isInfoToolOpen}
          onClose={handleCloseTool}
          isCorect={true}
        />
      </>
      
    )
  }

export default Register