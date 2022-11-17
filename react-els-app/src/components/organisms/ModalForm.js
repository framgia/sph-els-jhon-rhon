import React from 'react';
import ReactDom from 'react-dom';


import CloseButton from '../atoms/CloseButton';
import SubmitButton from '../atoms/SubmitButton';

const ModalForm = ({isOpen, children, submitText, modalHeader, onSubmit, onClose, btnBgColor = ''}) => {
    
    if(isOpen) {
        return ReactDom.createPortal(
            <div id='modalElement' className='fixed z-2 inset-0 bg-black/25' onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className='fixed divide-y divide-blue-300 w-4/5 lg:w-2/5 border border-blue-500 rounded-md p-2 bg-white top-1/2 left-1/2 translate-x-n1/2 translate-y-n1/2'>
                    
                    <div className='flex flex-row justify-between items-center p-2'>
                        <div className='font-semibold text-lg'>{modalHeader}</div>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={onSubmit} className='divide-y divide-blue-300'>
                        <div className='px-2 py-6'>
                            {children}
                        </div>
                        <div className='flex flex-row justify-end items-center p-2'>
                            <div>
                                <SubmitButton bgColor={btnBgColor} custStyle='text-sm' buttonText={submitText} />
                            </div>                        
                        </div>
                    </form>
                </div>
            </div>,
            document.querySelector('#modal')
        );
    }
}

export default ModalForm;
