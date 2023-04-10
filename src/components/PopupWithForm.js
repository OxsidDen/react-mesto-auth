
function PopupWithForm(props){
    return(
        <div className={`popup ${props.isOpen ? 'popup_opend':''}`} id ={`popup${props.name}`} >
          <form className="form " id ={`form${props.name}`} method="post" noValidate onSubmit={props.onSubmit}>
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__save-button" >{props.button||"Cохранить"}</button>
          </form>
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
    )
}

export default PopupWithForm