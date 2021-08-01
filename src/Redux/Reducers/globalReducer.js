import { checkLoginStatus } from '../../Helpers/auth';

const initialState = {
    isAuthenticated: checkLoginStatus(),
    userInfo: null,
    loading: false,
    errorMessage: '',
    successMessage: '',
    articles: [],
    singleArticle: null
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            {
                return {
                    ...state,
                    userInfo: action.userInfo,
                    isAuthenticated: true
                }
            }
        case "LOGOUT":
            {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false
                }
            }
        case 'SUCCESS_MESSAGE':
            {
                return {
                    ...state,
                    successMessage: action.message
                }
            }
        case 'ERROR':
            {
                return {
                    ...state,
                    errorMessage: action.error
                }
            }
        case 'SET_LOADING':
            {
                return {
                    ...state,
                    loading: true
                }
            }
        case 'UNSET_LOADING':
            {
                return {
                    ...state,
                    loading: false,
                    errorMessage: '',
                    successMessage: ''
                }
            }
        case 'GET_ARTICLES':
            {
                return {
                    ...state,
                    articles: action.data
                }
            }
        case 'USER_INFO':
            {
                return {
                    ...state,
                    userInfo: action.userInfo
                }
            }
        case 'UPDATE_USER_INFO':
            {
                const { userInfo } = state;
                userInfo.name = action.data.name;
                userInfo.surname = action.data.surname;
                return {
                    ...state,
                    userInfo
                }
            }
        case 'GET_SINGLE_ARTICLE':
            {
                return {
                    ...state,
                    singleArticle: action.data
                }
            }
        default:
            return state;
    }
}

export default globalReducer;