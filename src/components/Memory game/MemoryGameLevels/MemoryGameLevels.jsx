import React, {useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import Levels from "../../Base/Levels/Levels";
import {showCards} from "../../../cards";


const MemoryGameLevels = () => {
    const {setCardsNumber, start, reset, setClick, setSameCards, cardsNumber} = useOutletContext()
    const [level, setLevel] = useState("Choose your level:")
    const [active, setActive] = useState(false)

    const navigate = useNavigate()

    const handlerClick = (difficultyLevel, level) => {
        if (difficultyLevel === "Easy") {
            setCardsNumber(3)
        } else if (difficultyLevel === "Medium") {
            setCardsNumber(6)
        } else if (difficultyLevel === "Hard") {
            setCardsNumber(9)
        }

        setLevel(level)
        setActive(false)
    }

    const startGame = () => {
        navigate("/memory_game/play")
        showCards(cardsNumber).map(el => el.status = "")
        setClick(0)
        setSameCards(0)
        reset()
        start()
    }

    return (
        <Levels active={active} setActive={setActive} level={level} click={handlerClick} startGame={startGame}/>
    );
};

export default MemoryGameLevels;