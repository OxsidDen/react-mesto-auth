import {useState, useEffect} from 'react';
import Main from "./Main.js";
import Header from "./Header.js";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import {CurrentUserContext, user} from "../contexts/CurrentUserContext"
import React from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip.js';

function App() {
  //  Создание хуков
  const [isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(false);
  const [isInfoToolOpen, setInfoToolOpen] = useState(false)
  const [isCorect, setCorect] = useState(false);
  const[email, setEmail] = useState('')
  
  useEffect(() => {
    handleTokenCheck();
  }, [])

  useEffect(() => {
    if(isLoggedIn === true){
      api.getCards()
      .then((data) => {
          setCards(
              data.map((item) => ({
                  _id: item._id,
                  link: item.link,
                  name: item.name,
                  likes: item.likes,
                  owner: item.owner
              }))
          )
      })
      .catch((err) => {
          console.log(err); 
      }); 
      api.getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => { 
        console.log(err); 
      }) 
    }
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res){
            setLoggedIn(true);
            setEmail(res.data.email)
            navigate("/", {replace: true})
          }
        })
        .catch((err) => { 
          console.log(err); 
        }) 
      }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked){
      api.putLike(card._id)
        .then((res) => {
          setCards((state) => state.map((i) => i._id === card._id ? res : i))
        })
        .catch((err) => {
          console.log(err); 
      }); 
    }
    else{
      api.deletLike(card._id)
        .then((res) => {
          setCards((state) => state.map((i) => i._id === card._id ? res : i))
        })
        .catch((err) => {
          console.log(err); 
      }); 
    }
  } 

  function handleCardDelete(card){  
    api.deletCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id ));        
      })
      .catch((err) => {
        console.log(err); 
    }); 
  }

  function handleUpdateUser(info){
    api.changeProfile(info)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); 
    }); 
  }
  function handleUpdateAvatar(info){
    api.changeAvatar(info)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); 
    }); 
  }
  function handleAddPlaceSubmit(newCard){
    api.addNewPost(newCard)
      .then((res) => {
        setCards([res, ...cards]); 
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); 
    }); 
  }
  function handleRejister(email , password){
    auth.register(email, password)
      .then(() => {
        setCorect(true);
        setInfoToolOpen(true);
        navigate('/sign-in', {replace: true}) 
      })
        .catch((err) => {
          setCorect(false);
          setInfoToolOpen(true);
          console.log(err)
        })
  }
  function handleLogin(email, password){
    auth.authorize(email, password)
      .then((data) => {
        if (data.token){
          navigate('/', {replace: true});
          setLoggedIn(true);
          setCorect(true);
          setInfoToolOpen(true);
          setEmail(email)
        }
      })
      .catch((err) => {
        console.log(err);
        setCorect(false);
        setInfoToolOpen(true)
      }); 
  }
  
  // Открытие попапов
  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }
  function handleCardClick(item){
    setSelectedCard(item)
  }

  //   Закрытие попапов
  function closeAllPopups(){
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setInfoToolOpen(false)
  }
  return (
    < CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          email={email}
        />
      <Routes>
        <Route path='/sign-in' element={
          <Login 
            handleLogin={handleLogin}
          />}/>
        <Route path='/sign-up' element={
          <Register
            handleRejester={handleRejister}
        />}/>
        <Route path="/"
          element={
            <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
        <Footer /> 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          addNewCard={handleAddPlaceSubmit}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}
          />
        <PopupWithForm name="Delet" title="Вы уверены?" button="Да" onClose={closeAllPopups}/>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        /> 
        <InfoTooltip
          isOpen={isInfoToolOpen}
          onClose={closeAllPopups}
          isCorect={isCorect}
        />
        <template id="templateCard">
          
        </template>
      </div>
    </CurrentUserContext.Provider>
    
  );
}


export default App;
