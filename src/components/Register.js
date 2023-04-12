import React from 'react';
import {Link} from 'react-router-dom';


function Register({handleRejester, formValue, setFormValue}) {
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValue({
        ...formValue,
        [name]: value
      });
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      handleRejester(formValue.email, formValue.password)
      setFormValue({email: '', password: ''});
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
        
      </>
      
    )
  }

export default Register