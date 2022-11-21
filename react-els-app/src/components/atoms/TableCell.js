import React from 'react';

const TableCell = ({  children, custStyle = ''}) => {
    return (
        <td className={`border-b border-blue-200 border-solid p-2 ${custStyle}`}>
            {children}
        </td>
    );
}

export default TableCell;
