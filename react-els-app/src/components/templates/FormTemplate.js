import React from 'react';

const FormTemplate = ({ formHeader, children, onSubmit }) => {

    return (
        <div className='container w-full lg:w-1/3 mx-auto mt-6 p-6 rounded-xl border border-blue-300 border-solid shadow shadow-blue-200'>
            <div className='text-center text-3xl font-medium mb-4'>{formHeader}</div>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}

export default FormTemplate;
