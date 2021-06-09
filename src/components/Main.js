import React from 'react';

import  {Switch, Route } from 'react-router-dom';
import FruitCatalog from "./FruitCatalog/FruitCatalog";
import InfoFruit from "./InfoFruit/InfoFruit";
import {create, fruits} from "../const/constant";
import CreateFruit from "./createFruit/CreateFruit";



const Main = () => {
    return (
        <div className='main'>
            <Switch>
                <Route path={['/',`/${fruits}`]}exact component={FruitCatalog}/>
                <Route path={`/${create}`} exact component={CreateFruit}/>
                <Route path={`/${fruits}/:fruit`} exact render={routeProps => <InfoFruit {...routeProps}/>}/>
            </Switch>
        </div>
    );
};

export default Main;