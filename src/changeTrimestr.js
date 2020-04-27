import React, { useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
// import { ru } from 'date-fns/locale';
import loader from './loader.svg';

const ChangeTrimestr = (props) => {

    const [optionState, setOption] = useState('option1');
    const [selectedDayState, setDay] = useState(1);
    const [selectedMonthState, setMonth] = useState(1);
    const [selectedYearState, setYear] = useState(2020);
   // const [endState, setEnd] = useState(new Date());
    useEffect(() => {
        console.log()
    }, [selectedDayState])
  useEffect(() => {
    let doc1 = document.getElementsByClassName('trimestrI');
    let doc2 = document.getElementsByClassName('trimestrII');
    let doc3 = document.getElementsByClassName('trimestrIII');
    doc1[0].classList.remove('before_I');
    doc2[0].classList.remove('before_II');
    doc3[0].classList.remove('before_III');
   // doc[2].classList.remove('before_III');
  }, [])
  const ChangeTrimestr = (index, e) => {
      e.preventDefault();
    props.change(index);
  };
  useEffect(() => {
    console.log()
}, [])
const hideCalc = (open) => {
    let doc = document.getElementsByClassName('fon_for_calc');
    let calc = document.getElementsByClassName('calc');
    if (open === true){
        doc[0].style.display = 'block';
        calc[0].style.display = 'block';
    } else {
        doc[0].style.display = 'none';
        calc[0].style.display = 'none';
    }

}
const optionShow = (start, end) => {
    let arr = [];
    for(let i = start; i <=end; i++){
        arr.push(
            <option value={i}>{i}</option>
        )
    }
    return arr;
}
const optionShowMonth = () => {
    let am = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let arr = [];
    for(let i = 0; i < 12; i++){
        arr.push(
            <option value={i}>{am[i]}</option>
        )
    }
    return arr;
}
let am = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const [dayMes, setDayMes] = useState(0);
const [monthMes, setMonthMes] = useState(0);
const [yearMes, setYearMes] = useState(0);
const [weekMes, setWeekMes] = useState(0);

const [weekOption, setWeekOption] = useState(1);
const backToEditCalc = () => {
    let doc = document.getElementById('edit_calc');
    let enddoc = document.getElementById('show_results');
    enddoc.style.display = 'none';
    doc.style.display = 'block';
}
const calculation = method => {
    let doc = document.getElementById('edit_calc');
    let enddoc = document.getElementById('show_results');
    let loading = document.getElementById('loading');
    loading.style.display = 'flex';
    setTimeout(() => {loading.style.display = 'none';}, 1000);
    setTimeout(() => {enddoc.style.display = 'block';}, 1000);
    doc.style.display = 'none';
    if (method === 'option1'){
        let g = new Date(selectedYearState, selectedMonthState, selectedDayState);
        let x = dateFns.addDays(g, -90+5);
        x = dateFns.addYears(x, 1);
        setDayMes(x.getDate())
        setMonthMes(x.getMonth());
        setYearMes(x.getFullYear());
        function diff_weeks(dt2, dt1) 
        {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        return Math.abs(Math.round(diff));
        }
        let ww = diff_weeks(g, new Date());
        setWeekMes(ww);
    }
    if (method === 'option3'){
        setWeekMes(weekOption);
        let g = new Date();
        let countNedel = 41 - weekOption;
       // let x = dateFns.addMonths(g, 9);
        let x = dateFns.addWeeks(g, countNedel);
        x = dateFns.addDays(x, -2);
        setDayMes(x.getDate());
        setMonthMes(x.getMonth());
        setYearMes(x.getFullYear());
    }
    if (method === 'option2'){
        let g = new Date(selectedYearState, selectedMonthState, selectedDayState);
        let x = dateFns.addDays(g, 266);
        setDayMes(x.getDate());
        setMonthMes(x.getMonth());
        setYearMes(x.getFullYear());
        function diff_weeks(dt2, dt1) 
        {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        return Math.abs(Math.round(diff));
        }
        let ww = diff_weeks(g, new Date());
        setWeekMes(ww);
    }
}
  return (
          <div id="trim">
            <div className="site_name">PregnancyHelper</div>
            <div className="title">Информационный сайт ведения беременности</div>
            <div className="change_trimestr">
              <div role="button" onClick={(e) => ChangeTrimestr(0, e)} className="trimestr trimestrI before_I" id="I_trimestr">
                <div className="rome_number" id="I_numb">I</div>
                <div className="I_numb_text">триместр</div>
              </div>
              <div role="button" onClick={(e) => ChangeTrimestr(1, e)} className="trimestr trimestrII before_II" id="II_trimestr">
                <div className="rome_number" id="II_numb">II</div>
                <div className="I_numb_text">триместр</div>
              </div>
              <div role="button" onClick={(e) => ChangeTrimestr(2, e)} className="trimestr trimestrIII before_III" id="III_trimestr">
                <div className="rome_number" id="III_numb">III</div>
                <div className="I_numb_text">триместр</div>
              </div>
            </div>
            <div className="flex_footer" style={{ width: '100%' }}>
                <div className="text_calc">Калькулятор расчета даты родов и срока беременности</div>
              <button onClick={() => hideCalc(true)} className="calc_button">Показать</button>
            </div>
            <div onClick={() => hideCalc(false)} className="fon_for_calc">

            </div>
            <div className="calc">
                <div id="edit_calc">
                    <div id="edit_calc__title">Рассчитать даты родов и сроки беременности</div>
                    <div style={{ display: 'none' }} id="edit_calc__sub_title">Метод расчета:</div>
                    <div className="edit_calc__change_metod_calc">
                        <div className="edit_calc_change_metod_calc__text">по дню менструации</div>
                        <div className="input__radio_custom" onClick={() => setOption('option1')}>
                            <div style={{ opacity: optionState === 'option1' ? 1 : 0 }} className="radio_custom_selected" />
                        </div>
                        
                    </div>
                    <div className="edit_calc__change_metod_calc">
                        <div className="edit_calc_change_metod_calc__text">по дате зачатия</div>
                        <div className="input__radio_custom" onClick={() => setOption('option2')}>
                            <div style={{ opacity: optionState === 'option2' ? 1 : 0 }} className="radio_custom_selected" />
                        </div>
                    </div>
                    <div className="edit_calc__change_metod_calc">
                        <div className="edit_calc_change_metod_calc__text">по текущей неделе беременности</div>
                        <div className="input__radio_custom" onClick={() => setOption('option3')} >
                            <div style={{ opacity: optionState === 'option3' ? 1 : 0 }} className="radio_custom_selected" />
                        </div>
                    </div>
                    { optionState === 'option1' ? (
                        <>
                        <div className="selected_grid">
                            <select
                            value={selectedDayState}
                            onChange={(e) => setDay(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShow(1, 31)}
                            </select>
                            <select
                            value={selectedMonthState}
                            onChange={(e) => setMonth(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShowMonth()}
                            </select>
                            <select
                            value={selectedYearState}
                            onChange={(e) => setYear(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShow(1144, 2200)}
                            </select>
                        </div>
                        <div className="flex_for_button">
                        <button className="button_calculation" onClick={() => calculation(optionState)}>Рассчитать</button>
                        </div>
                    </>
                    ) : <></> }
                    { optionState === 'option2' ? (
                        <>
                        <div className="selected_grid">
                            <select
                            value={selectedDayState}
                            onChange={(e) => setDay(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShow(1, 31)}
                            </select>
                            <select
                            value={selectedMonthState}
                            onChange={(e) => setMonth(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShowMonth()}
                            </select>
                            <select
                            value={selectedYearState}
                            onChange={(e) => setYear(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShow(1144, 2200)}
                            </select>
                        </div>
                        <div className="flex_for_button">
                        <button className="button_calculation" onClick={() => calculation(optionState)}>Рассчитать</button>
                        </div>
                    </>
                    ) : <></> }
                    { optionState === 'option3' ? (
                        <>
                        <div className="selected_grid_option3">
                            <select
                            value={weekOption}
                            onChange={(e) => setWeekOption(e.target.value)}
                            className="select_day"
                            id="paymentMethod"
                            >
                                {optionShow(1, 41)}
                            </select>
                            <div className="option3_week">Неделя</div>
                        </div>
                        <div className="flex_for_button">
                        <button className="button_calculation" onClick={() => calculation(optionState)}>Рассчитать</button>
                        </div>
                    </>
                    ) : <></> }
                </div>
                <div id="show_results">
                    <div id="edit_calc__title">Примерная дата родов:</div>
                    <div className="date_rod">
                        <div>{`${dayMes-1 > 0 ? dayMes-1 : dayMes} — ${dayMes + 1}`}</div>
                        <div>{am[monthMes]}</div>
                        <div>{yearMes}</div>
                        
                    </div>
                    <div id="edit_calc__title">Ваш срок беременности:</div>

                    <div id="week_mes">
                        <div className="date_rod_week">
                            <div>недель:</div>
                            <div>{weekMes}</div>
                        </div>
                        <button style={{ height: '3rem', marginTop: 0 }} className="button_calculation" onClick={() => props.toAboutWeek(weekMes)}>Посмотреть</button>
                    </div>
                    <div className="flex_for_button">
                        <button className="button_calculation" onClick={backToEditCalc}>Вернуться</button>
                    </div>
            </div>
                <div id="loading">
                <img src={loader} alt="Загрузка"></img>
                </div>
            </div>
          </div>
          
  );
}

export default ChangeTrimestr;