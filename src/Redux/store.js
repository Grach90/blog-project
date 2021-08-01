import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './Reducers/globalReducer';
import registerReducer from './Reducers/registerReducer';
import loginReducer from './Reducers/loginReducer';
import addReducer from './Reducers/addReducer';
import profileReducer from './Reducers/profileReducer';

const reducer = combineReducers({
    globalState: globalReducer,
    registerState: registerReducer,
    loginState: loginReducer,
    addState: addReducer,
    profileState: profileReducer

})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;