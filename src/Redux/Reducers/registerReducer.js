import { isRequired, maxLength, minLength, validetEmail } from '../../Helpers/validation';

function getInitialState() {
    return {
        formData: {
            email: {
                value: '',
                error: '',
                valid: false
            },
            password: {
                value: '',
                error: '',
                valid: false
            },
            confirmPassword: {
                value: '',
                error: '',
                valid: false
            },
            name: {
                value: '',
                error: '',
                valid: false
            },
            surname: {
                value: '',
                error: '',
                valid: false
            }
        }
    }
}

const minLength4 = minLength(4);
const maxLength30 = maxLength(30);
const minLengthPassword = minLength(6);

const registerReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'REGISTER_ONCHANGE':
            {
                const { formData } = state;
                const { id, value } = action.e.target;

                const error = ((id === 'password' && minLengthPassword(value)) ||
                        (id === 'confirmPassword' && minLengthPassword(value))) ||
                    isRequired(value) || minLength4(value) || maxLength30(value) ||
                    ((id === 'email' && validetEmail(value)) ||
                        (id === 'confirmPassword' && formData.password.value !== value && 'password does not match'))

                if (error) {
                    formData[id].valid = true;
                } else formData[id].valid = false;

                formData[id].value = value;
                formData[id].error = error;
                return {
                    formData
                }
            }
        case 'RESET_REGISTER_STATE':
            {
                return getInitialState();
            }
        default:
            return state;
    }
}

export default registerReducer;