


export const loggerMiddleware = store => next => action => {
    if(action.type === "contacts/getFruits"){
        localStorage.setItem('fruit', JSON.stringify(action.payload));
    }
    return next(action);
}