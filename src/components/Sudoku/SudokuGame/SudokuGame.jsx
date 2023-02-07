import React, {useState} from 'react';
import "./SudokuGame.css"
import {Outlet, useNavigate} from "react-router";
import RulesModal from "../../RulesModal/RulesModal";
import Title from "../../Base/Title/Title";
import Button from "../../Base/Button/Button";
import {useTranslation} from "react-i18next";
import {getObjLocalStorage} from "../../../helpers";

const SudokuGame = ({children}) => {
    const [history, setHistory] = useState([])
    const [solvedArray, setSolvedArray] = useState([])
    const [difficulty, setDifficulty] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const [timeHistory, setTimeHistory] = useState("")

    const [time, setTime] = useState(getObjLocalStorage("timeSudoku", {ms: 0, s: 0, m: 0, h: 0}))
    const [interv, setInterv] = useState()
    const [status, setStatus] = useState(0)

    let updateMs = time.ms
    let updateS = time.s
    let updateM = time.m
    let updateH = time.h

    const run = () => {
        if (updateM === 60) {
            updateH++
            updateM = 0
        }
        if (updateS === 60) {
            updateM++
            updateS = 0
        }
        if (updateMs === 100) {
            updateS++
            updateMs = 0
        }
        updateMs++
        const tempTime = setTime({ms: updateMs, s: updateS, m: updateM, h: updateH})
        localStorage.setItem("timeSudoku", JSON.stringify({ms: updateMs, s: updateS, m: updateM, h: updateH}))
        return tempTime
    }

    const start = () => {
        if (!interv) {
            setStatus(1)
            const intervalId = setInterval(run, 10);
            setInterv(intervalId)
        }
    }

    const pause = () => {
        clearInterval(interv)
        setInterv(undefined)
        setStatus(2)
    }

    const reset = () => {
        setStatus(0)
        setTime({ms: 0, s: 0, m: 0, h: 0})
        clearInterval(interv)
        setInterv(undefined)
        localStorage.removeItem("timeSudoku")
    }

    const resume = () => start()

    const navigate = useNavigate()
    const {t} = useTranslation()

    const openHomePage = () => {
        navigate('/')
        reset()
    }

    return (
        <div className="sudoku_wrapper">
            <Title titleText={t("Sudoku")}/>
            <div className="sudoku_container">
                <Button click={openHomePage} btnText={t("Home")}/>
                <Button click={() => setModalActive(true)} btnText={t("Rules")}/>
                <RulesModal active={modalActive} setActive={setModalActive}/>
                <Button click={() => navigate('/sudoku/levels')} btnText={t("New game")}/>
            </div>
            {children}
            <Outlet context={{
                history,
                setHistory,
                solvedArray,
                setSolvedArray,
                difficulty,
                setDifficulty,
                modalActive,
                setModalActive,
                timeHistory,
                setTimeHistory,
                time,
                status,
                start,
                pause,
                reset,
                resume
            }}/>
        </div>
    );
};

export default SudokuGame;