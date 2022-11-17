import React from 'react';

const Section = ({ children }) => {
    return (
        <section className='px-2.5 lg:px-0'>
            {children}
        </section>
    );
}

export default Section;
