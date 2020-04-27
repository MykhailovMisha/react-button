import React, { useState, useEffect } from 'react';
import { useClearCache } from "react-clear-cache";
import ChangeWeek from './changeWeek';
import ChangeTrimestr from './changeTrimestr';
import AboutWeek from './aboutWeek';
import axios from 'axios';
import './App.css';

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const [trimestrState, setTrimestr] = useState(0);
  const [weekState, setWeek] = useState(0);
  const [openTrimestr, setOpenTrimestr] = useState(true);
  const [openWeek, setOpenWeek] = useState(false);
  const [openAboutWeek, setOpenAboutWeek] = useState(false);
  const [open, setOpen] = useState(false);
  const TrimeestrChange = (i) => {
    setTrimestr(i);
    if (trimestrState >= 0 && trimestrState <= 2) {
      setOpenTrimestr(false);
      setOpenWeek(true);
    }
  }
  useEffect(() => {
    let d = new Date();
    let e = new Date('04.06.20');
    if (d > e){
      setOpen(false);
    } else {
      setOpen(true);
    }
    
  }, [])
  const WeekChange = (i) => {
    setWeek(i);
    if ((weekState >= 0) && (weekState <=41)) {
      setOpenTrimestr(false);
      setOpenWeek(false);
      setOpenAboutWeek(true);
    }
  }
  const backWeek = () => {
    setTrimestr(0);
    setOpenWeek(false);
    setOpenTrimestr(true);
  }
  const backToWeek = () => {
    setOpenAboutWeek(false);
    setOpenTrimestr(false);
    setOpenWeek(true);

  };
  const toAboutWeek = (i) => {
    setOpenTrimestr(false);
    setOpenWeek(false);
    setWeek(i);
    setOpenAboutWeek(true)
  }
  // "text": "Для начала следует разобраться, как происходит подсчет срока беременности. Существует два понятия о сроках беременности: эмбриональный срок и акушерский срок. </br></br>Эмбриональный срок – это промежуток времени непосредственно от дня зачатия до родов и составляет 38 недель. Но в подавляющем большинстве случаев день зачатия невозможно конкретно определить. Даже если любовный акт произошел единожды и женщина знает дату, само оплодотворение яйцеклетки могло произойти в течение двух-трех дней после соития. </br></br>Но конкретная точка отсчета необходима. В медицине ее принято считать от первого дня последнего (имеется ввиду «последнего» перед задержкой) менструального цикла. Это и есть акушерский или гестационный срок беременности. Длительность составляет 40 недель. Почему так? </br></br>Зачатие обычно происходит на 13–15 день месячного цикла (т.е. спустя 2 недели от первого дня месячных). К эмбриональному сроку добавляются эти две недели, и получается 38+2=40 недель – длительность акушерского срока беременности. </br></br>На этом нюансы подсчета срока беременности не заканчиваются. Так как 40 недель это 280 дней. Лунный месяц составляет 28 дней. В итоге акушерский срок беременности составляет 10 лунных месяцев или 40 недель или 280 дней. Когда на вопрос о сроке беременности отвечают в месяцах, легко запутаться. Требуется уточнение, о каком месяце речь? Календарном или лунном. Поэтому легче и точнее всего считать беременность по неделям. </br></br> Следует уточнить, что весь период вынашивания условно делят на три периода – триместры. Каждый триместр длится примерно три календарных месяца  (12–13 недель)."
  const clearCashe = (e) => {
    e.preventDefault();
    emptyCacheStorage();
  }
  return (
    <>
    {!isLatestVersion && (
      <div className="App">
        <div className="surface">
          {openTrimestr ? <ChangeTrimestr toAboutWeek={toAboutWeek} change={TrimeestrChange} /> : <></>}
          {openWeek ? <ChangeWeek change={WeekChange} trimestr={trimestrState} back={backWeek} /> : <></>}
          {openAboutWeek ? <AboutWeek backToWeek={backToWeek} week={weekState} /> : <></>}
        </div>
      </div>
      )}
    </>
  );
}

export default App;
