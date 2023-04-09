
function InfoTooltip(props){
    return(
        <div className={`popup ${props.isOpen ? 'popup_opend':''}`} id ={`popup${props.name}`}>
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            <div className="infotooltip__massage">
            </div>
        </div>
    )
}

export default InfoTooltip