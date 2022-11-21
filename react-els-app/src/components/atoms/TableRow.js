import React from 'react';

const TableRow = ({ children, onClick, custStyle = ''}) => {
    return (
        <tr className={`p-2 cursor-pointer hover:bg-blue-50 ${custStyle}`} onClick={onClick}>
            {children}
        </tr>
    );
}

export default TableRow;
