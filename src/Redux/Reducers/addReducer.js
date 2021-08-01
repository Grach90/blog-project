function getInitialState() {
    return {
        formData: {
            title: '',
            category: '',
            main_text: ''
        }
    }
}

const addReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'ONCHANGE_ADD':
            {
                const { formData } = state;
                const { value } = action.e.target;
                formData[action.id] = value;
                return {
                    formData
                }
            }
        case 'RESET_ADD':
            {
                return getInitialState();
            }
        default:
            return state;
    }
}

export default addReducer;