import React, { Component } from "react";

class loop extends Component {
    render() {
        const items = [];

        for (let i = 0; i < 5; i++) {
            // You can perform actions or add JSX elements to the items array here
            items.push(<div key={i}>Item {i}</div>);
        }

        return <div>{items}</div>;
    }
}

export default loop;
