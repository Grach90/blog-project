import decode from 'jwt-decode';
import store from '../Redux/store';


export function getToken() {
    const token = localStorage.getItem('token');

    if (token) {
        const parsed = JSON.parse(token);
        const decoded = decode(parsed.jwt);

        if (decoded.exp - new Date().getTime() / 1000 > 60) {
            return Promise.resolve(parsed.jwt);
        } else {
            const apiHost = process.env.REACT_APP_API_URL;
            fetch(`${apiHost}/user/${decoded.userId}/token`, {
                    method: 'PUT',
                    body: JSON.stringify({ refreshToken: parsed.refreshToken }),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw data.error;
                    saveToken(data);
                    return data.jwt;
                })
                .catch(() => logout());
        }

    } else logout();
}

export function saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function logout() {
    localStorage.removeItem('token');
    store.dispatch({ type: 'LOGOUT' });
}

export function checkLoginStatus() {
    return !!localStorage.getItem('token');
}

export function getUserInfo(token) {
    const apiHost = process.env.REACT_APP_API_URL;
    if (token) {
        return fetch(`${apiHost}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwt}`
                }
            }).then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                return data;
            }).catch(err => store.dispatch({ type: 'ERROR', errorMessage: err.message }));
    } else return null;
}