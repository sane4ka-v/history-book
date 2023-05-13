import React from "react";

import PageNumber from "../PageNumber";

import './index.css';
const Page = (props) => {
    const { data = {} } = props;
    console.log(data)
    console.log(Object.values(data)[0])

    return (
        <div className="my-page">
            <div className="content">{data.text[1]}</div>
            
            <PageNumber value={data.text[0] }/>
        </div>
    );
};

export default Page;