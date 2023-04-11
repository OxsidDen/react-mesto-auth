import React, {useState} from 'react';

import InfoTooltip from './InfoTooltip';

function Login(props) {
  const [isInfoToolOpen, setInfoToolOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
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
    setFormValue({email: '', password: ''});
    props.handleLogin(formValue.email, formValue.password)
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