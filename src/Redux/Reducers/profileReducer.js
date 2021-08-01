const initialState = {
    formData: {
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        oldPassword: ''
    },
    hide: true
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ONCHANGE_PROFILE':
            {
                const { formData } = state;
                const { id, value } = action.e.target;
                formData[id] = value;
                return {
                    ...state,
                    formData
                }
            }
        case 'SET_USER_INFO':
            {
                const { formData } = state;
                const { name, surname } = action.userInfo;
                formData.name = name;
                formData.surname = surname;
                return {
                    ...state,
                    formData
                }
            }
        case 'HIDE_PROFILE':
            {
                const { formData } = state;
                if (action.reset) {
                    formData.password = '';
                    formData.oldPassword = '';
                    formData.confirmPassword = '';
                }
                return {
                    formData,
                    hide: !state.hide
                }
            }
        default:
            return state;
    }
}

export default profileReducer;