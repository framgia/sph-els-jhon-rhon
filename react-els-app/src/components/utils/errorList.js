export const errorList = (status) => {
    let message = '';
    switch(status) {
        case(401): message = 'Administrative Privileges Required.'; break;
        case(404): message = 'Oops, items not found.'; break;
        case(500): message = 'No response from the server.'; break;
        default: message = 'Oops, something went wrong. Please try again later.'; break;
    }
    
    return message;
}
