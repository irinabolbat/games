import React from 'react';
import "./Card.css"
import {useOutletContext} from "react-router-dom";

const Card = ({card, index, clickHandler}) => {
    const {cardsNumber, status} = useOutletContext()

    const itemClass = card.status ? " active " + card.status : ""
    let className = "card_wrapper"

    if (cardsNumber === 3) {
        className = "card_wrapper"
    }
    if (cardsNumber === 6) {
        className = "card_wrapper card_wrapper_middle"
    }
    if (cardsNumber === 9) {
        className = "card_wrapper card_wrapper_hard"
    }

    return (
        <div key={card.id} className={`${className} ${itemClass}`} onClick={status === 2 ? null : () => clickHandler(index)}>
            <img src={card.image} alt={card.name} className="card_img"/>
        </div>
    );
};

export default Card;
