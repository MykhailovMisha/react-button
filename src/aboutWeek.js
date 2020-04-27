import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link, animateScroll as scroll } from "react-scroll";
// import chartohtml from 'htmlspecialchars';
// import dataJson from './data.json';
import './aboutWeek.css';

const AboutWeekS = (props) => {
    const [data, setData] = useState();
    const [fetched, setFetched] = useState(false);
    const [edit, setEdit] = useState(false);
    
    useEffect(() => {
        // console.log(window.location.search)
        if (window.location.search === '?edit') {
            const password = 1111;
            let submit = prompt('Введите пароль:');
            if (submit == password) {
                setEdit(true)
            }
        }
        axios.get('https://tranquil-plains-53916.herokuapp.com/')
        .then((req, res) => { 
            setData(req.data);
            setFetched(true)
            let x = document.querySelectorAll("textarea");
            let i;
            for (i = 0; i < x.length; i++) {
                x[i].style.cssText = 'height:auto; padding:0';
                x[i].style.cssText = '-moz-box-sizing:content-box';
                x[i].style.cssText = 'height:' + x[i].scrollHeight + 'px';
                x[i].style.cssText = 'min-height:' + x[i].scrollHeight + 'px';
            }
        }).catch((err) => {
            console.log(err)
        });

        
    }, [])
    //<Link activeClass="active" to={i} spy={true} smooth={true} offset={0} duration= {500}>{data.title}</Link>

    const toggleEdit = () => {
        if (edit) {
            console.log(data[props.week])
            const config = { headers: {'Content-Type': 'application/json'} };
            const url = `https://tranquil-plains-53916.herokuapp.com/api/edit/${data[props.week]._id}`
            const content = JSON.stringify(data[props.week])
            axios.put(url, content, config)
                .then(response => {
                    console.log('OK');
                }).catch((err) => {
                    console.log(err)
                });
            }
        setEdit(!edit)
    }

    const ShowButton = () => {
        // console.log(edit)
        if (edit) {
            return (
                <button className="button_calculation" onClick={toggleEdit}>Сохранить</button>
            )
        }
        return (<></>)
         
    }

    const listHandler = event => {
        let t = [...data]        
        if (event.target.name === 'delete') {
            for (var i=0, iLen=t[props.week].text.length; i<iLen; i++) {
                if (t[props.week].text[i].type === 'list_ul') {
                    console.log(t[props.week].text[i].content[event.target.id])
                    t[props.week].text[i].content.splice(event.target.id, 1);
                    console.log(t[props.week].text[i].content)
                    // t[props.week].text[i].content[event.target.id] = event.target.value
                    setData(t)
                };
            }
        }
        if (event.target.name === 'add') {
            for (var i=0, iLen=t[props.week].text.length; i<iLen; i++) {
                if (t[props.week].text[i].type === 'list_ul') {
                    console.log(t[props.week].text[i].content[event.target.id])
                    t[props.week].text[i].content.push('Новая запись');
                    console.log(t[props.week].text[i].content)
                    setData(t)
                };
            }
        }
        
    }

    const textAreaHandler = event => {

        let el = event.target;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
            el.style.cssText = 'min-height:' + el.scrollHeight + 'px';
          },0);
        
        let t = [...data]
        if (event.target.name === 'title') {
            t[props.week].title = event.target.value
            setData(t)
        }
        if (event.target.name === 'image_plod') {
            t[props.week].image_plod = event.target.value
            setData(t)
        }
        if (event.target.name === 'text_for_icon') {
            t[props.week].text_for_icon = event.target.value
            setData(t)
        }
        if (event.target.name === 'image_icon') {
            t[props.week].image_icon = event.target.value
            setData(t)
        }
        if (event.target.name === 'image_bottom') {
            t[props.week].image_bottom = event.target.value
            setData(t)
        }
        if (event.target.name === 'text') {
            // console.log(event.target)
            // console.log(t[props.week].text[event.target.id])
            t[props.week].text[event.target.id].content = event.target.value
            setData(t)
        }
        if (event.target.name === 'li') {
            for (var i=0, iLen=t[props.week].text.length; i<iLen; i++) {
                if (t[props.week].text[i].type === 'list_ul') {
                    console.log(t[props.week].text[i].content[event.target.id])
                    t[props.week].text[i].content[event.target.id] = event.target.value
                    setData(t)
                };
            }
            setData(t)
        }
    }

    const textMap = (textdata) => {
            if (textdata.type === 'paragraph'){
                if (edit) {
                    return(
                        <textarea name={'text'} id={textdata.index} style={{ resize: 'both'}} value={textdata.content} onChange={textAreaHandler}></textarea>
                    )
                }
                return(
                    <div id={textdata.index} className="text_info_week" dangerouslySetInnerHTML={{__html: textdata.content}} />
                )
            }
            if (textdata.type === 'image'){
                if (edit) {
                    return(
                        <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week" >
                            <img src={textdata.content} alt="" className="img_about_week" />
                            <textarea name={'text'} id={textdata.index} style={{ width: '100%', resize: 'both'}} value={textdata.content} onChange={textAreaHandler}></textarea>
                        </div>
                    )
                }
                return(
                    <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week" >
                        <img src={textdata.content} alt="" className="img_about_week" />
                    </div>
                )
            }
            if (textdata.type === 'list_ul'){
                if (edit) {
                    return(
                        <ul name={'ul'} className="ul_about_week">
                            {textdata.content.map((temp, index) => (<><li><textarea name={'li'} id={index} value={temp} onChange={textAreaHandler}></textarea></li><button id={index} name={'delete'} onClick={listHandler}>-</button></>))}
                            <button name={'add'} onClick={listHandler}>+</button>
                        </ul>
                    )
                }
                return (
                    <ul className="ul_about_week">
                        {textdata.content.map((temp) => (<><li>{temp}</li></>))}
                    </ul>
                )
            }
            if (textdata.type === 'ol'){
                return (
                    <ol className="ol_about_week">
                        {textdata.list_ol.map((temp) => (<li>{temp}</li>))}
                    </ol>
                )
            }
    };
   // const Show = () => data.dataforweek[props.week].data.map(Each);
    const EachText = () => {
        if (data[props.week].title){
            if (edit) {
                return (
                    <>
                        <div className="title_info_week" name={props.week}>{data[props.week].title}</div>
                        <textarea name={'title'} style={{ width: '60%'}} value={data[props.week].title} onChange={textAreaHandler}></textarea>
                        
                        <div className="about_week__grid">
                            <div style={{gridArea: 'text' }}>
                                {data[props.week].text.map(textMap)}
                            </div>
                            <div style={{gridArea: 'icon' }}>
                                <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week" >
                                    <img src={data[props.week].image_plod} alt="" className="img_about_week" />
                                    <textarea name={'image_plod'} style={{ width: '100%'}} value={data[props.week].image_plod} onChange={textAreaHandler}></textarea>
                                </div>
                                <div className="text_for_icon" dangerouslySetInnerHTML={{__html: data[props.week].text_for_icon}} />
                                <textarea name={'text_for_icon'} style={{ width: '100%'}} value={data[props.week].text_for_icon} onChange={textAreaHandler}></textarea>
                                <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week for_icon">
                                    <img src={data[props.week].image_icon} alt="" className="img_about_week" />
                                    <textarea name={'image_icon'} style={{ width: '100%'}} value={data[props.week].image_icon} onChange={textAreaHandler}></textarea>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week bootom_img">
                            <img src={data[props.week].image_bottom} alt="" className="img_about_week" />
                            <textarea name={'image_bottom'} style={{ width: '100%'}} value={data[props.week].image_bottom} onChange={textAreaHandler}></textarea>
                        </div>
                    </>
                )
            }
            return (
                <>
                    <div className="title_info_week" name={props.week}>{data[props.week].title}</div>
                    <div className="about_week__grid">
                        <div style={{gridArea: 'text' }}>
                            {data[props.week].text.map(textMap)}
                        </div>
                        <div style={{gridArea: 'icon' }}>
                            <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week" >
                                <img src={data[props.week].image_plod} alt="" className="img_about_week" />
                            </div>
                            <div className="text_for_icon" dangerouslySetInnerHTML={{__html: data[props.week].text_for_icon}} />
                            <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week for_icon">
                                <img src={data[props.week].image_icon} alt="" className="img_about_week" />
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url('${'d'}')` }} className="div_img_about_week bootom_img">
                        <img src={data[props.week].image_bottom} alt="" className="img_about_week" />
                    </div>
                </>
            )
        }
            return(
                <></>
            )
        }
    //             {Show()} перед шовтекст
    // const ShowText = () => data[props.week].map(EachText);
    

    if (fetched) {
        return(
            <div className="changeWeek">
                <div className="calc_button" id="back_from_change_week" onClick={props.backToWeek}>Назад</div>
                <div className="week_title">PregnancyHelper</div>
                
                {/* {ShowText()} */}
                {EachText()}
                {ShowButton()}
                {/* <button className="button_calculation" onClick={toggleEdit}>Сохранить</button> */}
                <div className="flex_for_button mobile_back">
                    <button className="button_calculation" onClick={props.backToWeek}>Назад</button>
                </div>
            </div>
            
        )
    }else{
        return(
            <></>
        )
    }
}

export default AboutWeekS;
