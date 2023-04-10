import PopupWithForm from "./PopupWithForm.js";
import React, { useState } from "react";

function AddPlacePopup(props){

    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    function addPlace(e) {
        setPlace(e.target.value);
    }
    function addLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addNewCard({
            link: link,
            place: place,
        });
        
    } 

    return(
        <PopupWithForm name="Place" title ="Новое место" button="Создать" isOpen = {props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="form__input" placeholder="Название" id="form__place" name="place" required type="text" minLength="2" maxLength="30" value={place || ''} onChange={addPlace}/>
            <span className="form__input-error form__place-error"></span> 
            <input className="form__input" placeholder="Ссылка на картинку" id="form__link" name="link" required type="url" onChange={addLink} value={link || ''}/>
            <span className="form__input-error form__link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup