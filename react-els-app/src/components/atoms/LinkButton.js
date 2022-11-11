import React from "react";

const LinkButton = ({ children, onClick }) => {
    return (
        <div className="cursor-pointer" onClick={onClick}>
            {children}
        </div>
    );
}

export default LinkButton;
