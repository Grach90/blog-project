import { getToken, saveToken, logout, getUserInfo } from '../Helpers/auth';
import store from '../Redux/store';
const apiHost = process.env.REACT_APP_API_URL;

export function registerThunk(dispatch, data, history) {
    dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/user`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'SUCCESS_MESSAGE', message: 'You have been registered successfully!' });
            history.push('/login');
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export function signIn(formData, dispatch, history) {
    dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/user/sign-in`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(async(data) => {
            if (data.error) throw data.error;
            const userInfo = await getUserInfo(data);
            saveToken(data)
            history.push('/');
            dispatch({ type: 'LOGIN', userInfo });

        })
        .catch(err => dispatch({ type: 'ERROR', error: err.msesage }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export async function signout(dispatch, history) {
    dispatch({ type: 'SET_LOADING' });
    const token = await getToken();
    fetch(`${apiHost}/user/sign-out`, {
            method: 'POST',
            body: JSON.stringify({ jwt: token }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            logout();
            history.push('/login');
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export function getArticlesThunk(dispatch) {
    dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'GET_ARTICLES', data })
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export function addArticle(formData, history, dispatch) {
    dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/task`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'SUCCESS_MESSAGE', message: 'Article has been added successfully!' });
            history.push('/');
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export async function editUserInfo(formData, history, dispatch) {
    dispatch({ type: 'SET_LOADING' });
    const token = await getToken();
    fetch(`${apiHost}/user`, {
            method: 'PUT',
            body: JSON.stringify({ name: formData.name, surname: formData.surname }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'SUCCESS_MESSAGE', message: 'User info has been edited successfully!' });
            dispatch({ type: 'UPDATE_USER_INFO', data });
            dispatch({ type: 'HIDE_PROFILE', reset: true });
            history.push('/profile');
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));

    if (formData.password) {
        fetch(`${apiHost}/user/password`, {
                method: 'PUT',
                body: JSON.stringify({
                    newPassword: formData.password,
                    confirmNewPassword: formData.confirmPassword,
                    oldPassword: formData.oldPassword
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                dispatch({ type: 'SUCCESS_MESSAGE', message: 'Password has been edited successfully!' });
                dispatch({ type: 'HIDE_PROFILE', reset: true });
                history.push('/profile');
            })
            .catch(err => dispatch({ type: 'ERROR', error: err.message }))
            .finally(() => dispatch({ type: 'UNSET_LOADING' }));
    }
}

export function getSingleArticle(id, dispatch) {
    dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'GET_SINGLE_ARTICLE', data })
        })
        .catch(err => dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => dispatch({ type: 'UNSET_LOADING' }));
}

export function searchArticle(searchValue) {
    store.dispatch({ type: 'SET_LOADING' });
    fetch(`${apiHost}/task?search=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            console.log(data);
            store.dispatch({ type: 'GET_ARTICLES', data });
        })
        .catch(err => store.dispatch({ type: 'ERROR', error: err.message }))
        .finally(() => store.dispatch({ type: 'UNSET_LOADING' }));
}