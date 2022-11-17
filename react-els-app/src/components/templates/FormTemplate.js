import React from 'react';

const FormTemplate = ({ formHeader, children, onSubmit, custStyle = '', largeWidth = '', headerStyle = '' }) => {
    largeWidth = (largeWidth)? largeWidth : 'lg:w-1/3';
    headerStyle = (headerStyle)? headerStyle : 'text-center text-3xl font-medium';

    return (
        <div className={`container w-full ${largeWidth} mx-auto mt-6 p-6 rounded-xl border border-blue-300 border-solid shadow shadow-blue-200 ${custStyle}`}>
            <div className={`mb-4 ${headerStyle}`}>{formHeader}</div>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}

export default FormTemplate;
