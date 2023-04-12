import {useLocation, Link, useNavigate} from 'react-router-dom'

function Header(props){
    const location = useLocation();
    const navigate = useNavigate();
    function signOut(){
        localStorage.removeItem('jwt');
        navigate('/sign-in');
        props.setFormValue({email: '', password: ''});
    }
    return(
        <header className="header">
            <div className="logo logo_place_header"></div>

                {location.pathname === '/' && <div className='header__info'> 
                    <p className='header__email'>{props.email}</p>
                    <button onClick={signOut} className="header__signout">Выйти</button>
                </div>}
                {location.pathname === '/sign-up' && <Link to='/sign-in' className='header__button'>Войти</Link>}
                {location.pathname === '/sign-in' && <Link to='/sign-up' className='header__button'>Регистрация</Link>}
        </header>
    )
}
    

export default Header;