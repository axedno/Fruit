import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFruits, renderByMax, renderByMin, sortByName} from "../../store/contactSlice";
import styled from 'styled-components';
import {create, fruits} from "../../const/constant";
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import {useEasybase} from "easybase-react";
import useDebounce from "../useDebounce/useDebounce";
import ReactPaginate from 'react-paginate';




const MainBlock = styled.div`
        border-radius: 40px;
        border: 1px solid rosybrown;
        padding: 50px;
        h1 {
         color: red;
        }
        text-align: center;    
        button {
         margin: 15px auto;
        }
`

const Blocks = styled.div`
        display: flex;
        width: 90%;
        margin: 0 auto;
        justify-content: space-around;
        flex-wrap: wrap;
`
const Block = styled.div`
        margin: 10px 15px;
        display: flex;
        flex-direction: column;
        width: 20%;
        text-align: center;
        border: 1px solid red;
        margin-top: 30px;
        }
        img{
            height: 250px;
            width: 250px;
            margin: 0 auto;  
        }
        button {
            width: 80%;
            margin: 15px auto;
            border: 1px solid green;
            background-color: white;
        }
        h4{ 
            font-size: 16px;
            height: 100px;
        }
`
const SortBlock = styled.div`
          display: flex;
          justify-content: space-between;
          width: 80%;
          margin: 0 auto;
`


const  FruitCatalog = ()  => {

    const dispatch = useDispatch();
    const contact = useSelector(state => state.toolkit.contact)

    const [input, setInput] = useState('');
    const [sortFruitName, setSortFruitName] = useState('');

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 4;

    const pagesVisited = pageNumber * usersPerPage;

    const {db} = useEasybase();
    const table = db("FRUIT");
    const { e } = table;



    const mounted = async () => {
        const ebData = await db("FRUIT").return().all()
        const data = await  ebData.filter(item => {
                return  item.name.toLowerCase().includes(sortFruitName.toLowerCase())
            });

        dispatch(getFruits(data));
    }
    const debouncedSearch = useDebounce(mounted, 500);


    const change = (e) => {
        setInput(e.target.value);
    }



    const handleDelete = async (key) => {
         try {
             await table.delete().where(e.eq('_key', `${key}`)).all();
         } catch (_) {
             console.log('miss')
         } finally {
             mounted()
         }
    }



    const renderByMinMax = () => {
        if (input === 'false') {
            return dispatch(renderByMax())
        }else if(input==='true'){
            return dispatch(renderByMin())
        } else {
            return  contact
        }
    }
    renderByMinMax()




    const showFruits = () => {
        if (contact.length !== 0) {
            return (
                contact.slice(pagesVisited, pagesVisited + usersPerPage).map((ele, index) => {
                        return (
                            <Block key={index}>
                                <h2>{index + pagesVisited + 1}</h2>
                                <img src={ele.img} alt={'img'}/>
                                <h3>{ele.name}</h3>
                                <h4>{ele.description}</h4>
                                <p>Количество: {ele.count}</p>
                                <Link key={index} to={`/${fruits}/${ele.link}`}>
                                    <button onClick={() => ele.link}>Полной описание</button>
                                </Link>
                                <button onClick={() => handleDelete(
                                    ele._key
                                )}>Удалить продукт</button>
                            </Block>
                        )
                }
                )
            )
        }
    }

    const pageCount = Math.ceil(contact.length / usersPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected);
    };


    useEffect(() => {
        onChange()
    }, [sortFruitName])

    const onChange = () => {
        debouncedSearch(sortFruitName)
    }

    return (
        <MainBlock>
            <h1>Каталог товаров</h1>
            <Link to={`/${create}`}>
                <Button variant="primary">New Product</Button>
            </Link>
            <SortBlock>
                <div>
                    <p>Максимальное количество</p>
                    <input type="radio"
                           checked={input === 'true'}
                           value="true"
                           onChange={change}
                    />
                </div>
                <div>
                    <p>Минимальное количество</p>
                    <input type="radio"
                           checked={input === 'false'}
                           value="false"
                           onChange={change}
                    />
                </div>
                <div>
                    <p>Поиск по имени</p>
                    <input  onChange={(e) => setSortFruitName(e.target.value)} type="text"/>
                </div>
            </SortBlock>
            <Blocks>
                {showFruits()}
            </Blocks>
            <div className='pagination'>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </MainBlock>

    )
}

export default FruitCatalog