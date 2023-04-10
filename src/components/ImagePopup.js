function ImagePopup(props) {
    return(
        <div className={ `popup popup_view-place ${props.card ? 'popup_opend':''}`} id="popupView">
            <div className="popup__view " id="formView">
                <img className="popup__img" id="viewImg" src={`${props.card?.link}`} alt={props.card?.name}/>
                 <p className="popup__caption">{props.card?.name}</p>
            </div>
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
    )
}

export default ImagePopup