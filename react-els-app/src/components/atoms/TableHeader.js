import React from 'react';

const TableHeader = ({  children, custStyle = ''}) => {
    return (
        <th className={`border-b-2 border-blue-300 border-solid bg-blue-200 font-semibold text-start align-center ${custStyle}`}>
            {children}
        </th>
    );
}

export default TableHeader;
