export default function (state, { type, payload }) {
    switch (type) {
        
        case 'SET_VALUE':
            return {
                ...state,
                [payload.key]: payload.value,
            }
        case 'SET_ERROR':
            return {
                ...state,
                'errorMessage': payload.value,
                'successMessage': ""

            }
        case 'SET_SUCCESS':
            return {
                ...state,
                "successMessage": payload.value,
                "errorMessage": ""
            }
        
        default:
            return state
    }
}
