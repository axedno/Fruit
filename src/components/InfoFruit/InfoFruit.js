import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {fruits} from "../../const/constant";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {commentsDelete, commentsNew} from "../../store/contactSlice";

const InfoFruit = (props) => {

    const dispatch = useDispatch();
    const contact = useSelector(state => state.toolkit.contact)
    const comments = useSelector(state => state.toolkit.comments)
    let key = props.match.params.fruit;

    const [value, setValue] = useState('');



    const putComment = () => {
        dispatch(commentsNew({
            value,
            key
        }))
    }



  const  displayComments = () => {

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
        if(comments[key]) {
            return (
                comments[key].map((item, index) => {
                    return (
                        <div key={index}>
                            <p>Номер: {index + 1} </p>
                            <p>Дата: {today}</p>
                            <p className='fruit__comment'>{item}</p>
                            <Button onClick={() => dispatch(commentsDelete({index, key}))} variant="primary">Delete</Button>
                        </div>
                    )
                })
            )
        }
  }


    const showFruit = () => {
          const getFruit =  contact.filter(fruit => fruit.link === key)
          return (
              getFruit.map((item, index) => {
                  return (
                      <div  key={index} className='fruit__block'>
                          <img className='fruit__image' src={item.img} alt="img"/>
                          <p className='fruit__info'>{item.info}</p>
                          <p className='fruit__count'>Количество: {item.count}</p>
                          <p className='fruit__colour'>Цвет: {item.colour}</p>
                          <p className='fruit__size'>Размер: {item.size}</p>
                          <p className='fruit__weight'>Вес:{item.weight}g</p>
                      </div>
                  )
              })
          )
    }

    return (
        <div>
            <div className='fruit'>
                <h3 className='fruit__descr'>Описание фрукта</h3>
                {showFruit()}
                <textarea onChange={(e) => setValue(e.target.value)}></textarea>
                {displayComments()}
                <div>
                    <Button onClick={putComment} variant="danger" style={{marginTop: '50px', marginBottom: '50px'}}>Add comments</Button>
                </div>
                <div>
                    <Link  to={`/${fruits}`}    >
                        <button className='fruit__btn'><span className='fruit__btn_text'>На главную</span></button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default InfoFruit;