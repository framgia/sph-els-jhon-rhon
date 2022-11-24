import React from 'react';

const Empty = ({ children, data }) => {
    if(data.length === 0) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

export default Empty;
