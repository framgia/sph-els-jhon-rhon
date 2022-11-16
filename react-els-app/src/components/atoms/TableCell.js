import React from "react";

const TableCell = ({  children, custStyle = ''}) => {
    return (
        <td className={`border border-blue-300 border-solid p-2 ${custStyle}`}>
            {children}
        </td>
    );
}

export default TableCell;
