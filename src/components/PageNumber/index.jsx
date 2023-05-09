import React from "react";

const PageNumber = (props) => {
    const { value = '' } = props;

    return (
        <div className="page-number">
            {value}
        </div>
    );
};

export default PageNumber;