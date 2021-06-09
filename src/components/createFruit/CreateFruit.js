import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getFruits} from "../../store/contactSlice";
import {fruits} from "../../const/constant";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router";
import {useEasybase} from "easybase-react";



const CreateNew = styled.div`
       margin: 0 auto;
       width: 80%;
       border-radius: 50px;
       padding: 20px;
       border: 1px solid red;
       display: flex;
       align-items: center;
       flex-direction: column;
       button {
          width: 200px;
          height: 50px;
          display: block;
          margin-top: 20px;
        }
`


const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [inputValid, setInputValid] = useState(false)

    useEffect(()=> {
        for (const validation in validations) {
            switch (validation){
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
            }
        }

    }, [value])

    useEffect(() => {
        if(isEmpty) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty])

    return {
        isEmpty,
        inputValid
    }
}



const CreateFruit = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const img = useInput('', {isEmpty: true })
    const description = useInput('', {isEmpty: true })
    const count = useInput('', {isEmpty: true })
    const colour = useInput('', {isEmpty: true })
    const size = useInput('', {isEmpty: true })
    const weight = useInput('', {isEmpty: true })
    const link = useInput('', {isEmpty: true })
    const info = useInput('', {isEmpty: true })
    const name = useInput('', {isEmpty: true })

    const {db} = useEasybase();

    const mounted = async () => {
        const ebData = await db("FRUIT").return().all();
        dispatch(getFruits(ebData));

    }

    const handleAddCardClick = async () => {
        try {
            await db('FRUIT').insert({
                img: img.value,
                description: description.value,
                count: count.value,
                colour: colour.value,
                size: size.value,
                weight: weight.value,
                link: link.value,
                info: info.value,
                name: name.value
            }).one();
        } catch (e) {
            console.log("Error on input format")
        } finally {
            mounted();
            history.push(`/${fruits}`)
        }
    }




    return (
        <div>
            <CreateNew>
                <p>Сылка на картинку</p>
                {(img.isDirty && img.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <textarea onChange={e => img.onChange(e)} onBlur={e => img.onBlur(e)}   type='text' />
                </label>
                <p>Описание</p>
                {(description.isDirty && description.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => description.onChange(e)} onBlur={e => description.onBlur(e)} name='die' type="text"/>
                </label>
                <p>Количество</p>
                {(count.isDirty && count.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => count.onChange(e)} onBlur={e => count.onBlur(e)}   type="number" />
                </label>
                <p>Цвет</p>
                {(colour.isDirty && colour.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => colour.onChange(e)} onBlur={e => colour.onBlur(e)}   type="text"/>
                </label>
                <p>Размер</p>
                {(size.isDirty && size.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => size.onChange(e)} onBlur={e => size.onBlur(e)}    type="text"/>
                </label>
                <p>Вес</p>
                {(weight.isDirty && weight.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => weight.onChange(e)} onBlur={e => weight.onBlur(e)}   type="text"/>
                </label>
                <p>Link</p>
                {(link.isDirty && link.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => link.onChange(e)} onBlur={e => link.onBlur(e)}   type="text"/>
                </label>
                <p>Информация</p>
                {(info.isDirty && info.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => info.onChange(e)} onBlur={e => info.onBlur(e)}   type="text"/>
                </label>
                <p>Имя</p>
                {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                <label>
                    <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)}   type="text"/>
                </label>
                <Button  onClick={handleAddCardClick} disabled={!name.inputValid || !info.inputValid || !link.inputValid || !name.inputValid || !weight.inputValid || !size.inputValid || !colour.inputValid || !count.inputValid || !description.inputValid || !img.inputValid} variant="light">Добавить</Button>
                <Link  to={`/${fruits}`}>
                    <Button variant="warning">На главную</Button>
                </Link>
            </CreateNew>
        </div>
    );
};

export default CreateFruit;