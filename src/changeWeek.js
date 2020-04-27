import React, { useEffect, useState } from 'react';

const ChangeWeekS = (props) => {
    const [indexTrimestrStart, setStart] = useState(0);
    const [indexTrimestrEnd, setEnd] = useState(0);
    useEffect(() => {
        switch (props.trimestr) {
            case 0:
                setEnd(13);
                setStart(0);
                break;
            case 1:
                setEnd(27);
                setStart(14);
                break;
            case 2:
                setEnd(40);
                setStart(28);
                break;
            default:
                break;
        }
    }, [props]);
    const show = async () => {
        console.log('Загрузилась информация о всех неделях')
        let doc = await document.getElementsByClassName('week_orr')
        doc[0].style.opacity = '1';
        
    };
    useEffect( () => {
        show();
    }, [props.trimestr])
    const week = () => {
        let array = [];
        for (let i = indexTrimestrStart; i<= indexTrimestrEnd; i++){
            
                array.push(<div style={{ backgroundColor: `rgba(20,${(i+5)*20},220)` }} role="button" className="week" onClick={() => props.change(i)} key={i}>
                    <div className="number_of_week">{i+1}</div>
                    <div className="week_text"><span>неделя</span></div>
                    </div>);
        }
        return array;
    }
    return(
        <>
        <div className="changeWeek">
            
            <div className="week_title">Выберите интересующую вас неделю</div>

        </div>
        <div className="week_orr">
        {week()}
        </div>
        <div className="flex_footer">
        <button className="calc_button" style={{ marginTop: '2rem' }} onClick={props.back}>Назад</button>
        </div>
        
        </>
    )
}

export default ChangeWeekS;