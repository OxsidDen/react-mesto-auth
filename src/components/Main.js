import penPath from "../images/pen.svg"
import plusPath from "../images/plus.svg"
import Card from "./Card.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Main(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__personal">
                    <img src={currentUser.avatar} alt="Фото профиля" className="profile__photo"/>
                    <button className="profile__photo-edit" type="button" onClick={props.onEditAvatar}></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__change" onClick ={props.onEditProfile} >
                            <img src={penPath} alt="Изменить профиль"/>
                        </button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add" onClick ={props.onAddPlace}>
                    <img src={plusPath} alt="Кнопка добавить" className="profile__plus"/>
                </button>
            </section>
            <section className="elements">
                {
                    props.cards.map((card) =>
                        <Card 
                        card={card}
                        key={card._id}
                        onCardClick={props.onCardClick} 
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        {...card}
                        />
                    )
                }
            </section>
        </main>
    );
}

export default Main