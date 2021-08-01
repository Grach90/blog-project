function getInitialState() {
    return {
        formData: {
            email: '',
            password: ''
        }
    }
}

const loginReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'ONCHANGE_LOGIN':
            {
                const { formData } = state;
                const { id, value } = action.e.target;
                formData[id] = value;
                return {
                    formData
                }
            }
        case 'RESET_LOGIN_STATE':
            {
                return getInitialState();
            }
        default:
            return state;
    }
}

export default loginReducer;