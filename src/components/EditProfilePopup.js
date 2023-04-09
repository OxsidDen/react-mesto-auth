import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import {useState} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function EditProfilePopup(props){

    const [name, setName] = useState('');
    const [description , setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]); 

    function changeName(e) {
        setName(e.target.value);
    }
    function changeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
        
    } 
    
    return(
        <PopupWithForm name="Prof" title ="Редактировать профиль" isOpen = {props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="form__input" placeholder="Ваше Имя" id="form__name" name="name" required type="text" minLength="2" maxLength="40" value={name || ''} onChange={changeName}/>
            <span className="form__input-error form__name-error"></span>
            <input className="form__input" placeholder="Чем вы занимаетесь" id="form__about" name="about" required type="text" minLength="2" maxLength="200" value={description || ''} onChange={changeDescription}/>
            <span className="form__input-error form__about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup