import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Main from "./components/Main";
import {useEasybase} from "easybase-react";
import {getFruits} from "./store/contactSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();

    const {db} = useEasybase();

    const mounted = async () => {
        const ebData = await db("FRUIT").return().all();
        dispatch(getFruits(ebData));
    }

    useEffect(() => {
        mounted();
    }, [])

  return (
    <div>
        <Main/>
    </div>
  );
}

export default App;
