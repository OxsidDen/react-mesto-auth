
function InfoTooltip(props){
    return(
        <div className={`popup ${props.isOpen ? 'popup_opend':''}`}>
            <div className="infotooltip__massage">
                <div className={`infotooltip__check ${props.isCorect ? 'infotooltip__corect' : 'infotooltip__error'}`}></div>
                <div className="infotooltip__text">{props.isCorect ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</div>
            </div>
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
    )
}

export default InfoTooltip