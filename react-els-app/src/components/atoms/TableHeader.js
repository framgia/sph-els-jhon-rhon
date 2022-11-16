import React from "react";

const TableHeader = ({  children, custStyle = ''}) => {
    return (
        <td className={`border border-blue-500 text-white border-solid p-2 bg-blue-500 font-semibold text-center ${custStyle}`}>
            {children}
        </td>
    );
}

export default TableHeader;
