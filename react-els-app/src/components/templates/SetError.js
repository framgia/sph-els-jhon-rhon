import { map } from "lodash";

const SetError = (dispatch, setter, status = null, errorData = {}, errors = {}) => {
    if(errorData) {
        map(errorData, function(value, key){
            dispatch(setter({key, value: ''}));
        });
    }

    console.log(setter);

    if(status === 400) {
        map(errors, function(value, key){
            dispatch(setter({key, value}));
        });
        return;
    }

    if(status === 401) {
        dispatch(setter({key: 'header', value: 'Administrative Privileges Required.'}));
        return;
    }
    
    if(status === 404) {
        dispatch(setter({key: 'header', value: `Oops, items not found.`}));
        return;
    }

    if(status === 500) {
        dispatch(setter({key: 'header', value: 'No response from the server.'}));
        return;
    }

    dispatch(setter({key: 'header', value: 'Oops, something went wrong. Please try again later.'}));
}

export default SetError;
