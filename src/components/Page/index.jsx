import React from "react";

import PageNumber from "../PageNumber";

import './index.css';

const Page = (props) => {
    const { data = {} } = props;

    return (
        <div className="my-page">
            <div className="content">{Object.values(data)[0]}</div>
            <PageNumber value={Object.keys(data)[0]} />
        </div>
    );
};

export default Page;