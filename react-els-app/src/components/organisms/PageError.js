import React from "react";
import HeaderError from "../atoms/HeaderError";
import Section from "../atoms/Section";

import BackButton from "../molecules/BackButton";

const PageError = ({ children }) => {
    return (
        <Section>
            <div className='container w-full lg:w-1/3 mx-auto mt-6'>
                <BackButton />
            </div>
            <div className="container w-full lg:w-1/3 mx-auto mt-6">
                <HeaderError>{children}</HeaderError>
            </div>
        </Section>
    );
}

export default PageError;
