import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props){

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 
    
    return(
        <PopupWithForm name="EditAvatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}> 
            <input className="form__input" placeholder="Ссылка на новый аватар" id="form__input" name="avatar" margin="0" required type="url" ref={avatarRef} /> 
            <span className="form__input-error form__link-error"></span> 
        </PopupWithForm> 
    )
}

export default EditAvatarPopup