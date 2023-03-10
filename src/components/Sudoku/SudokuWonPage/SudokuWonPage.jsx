import React, {useEffect} from 'react';
import "./SudokuWonPage.css"
import {useOutletContext} from "react-router-dom";
import Title from "../../Base/Title/Title";
import Confetti from 'react-confetti'
import {useWindowSize} from '@react-hook/window-size'
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router";

const SudokuWonPage = () => {
    const {timeHistory} = useOutletContext()
    const {width, height} = useWindowSize();

    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state === null) {
            navigate("/")
        }
    }, [])

    return (
        <div className="sudoku_won_page_wrapper">
            <Confetti width={width} height={height}/>
            <Title titleText={t("You won this sudoku")} extraClassName="sudoku_won_title"/>
            <div className="won_sudoku_info">
                <span>{t("T")}</span> <span>{timeHistory}</span>
            </div>
        </div>
    );
};

export default SudokuWonPage;