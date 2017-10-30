// Demo component
// this is only example component

import * as React from 'react';
import { App } from './app';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="my-component">
                <App />
            </div>
        )
    }
}

export default MyComponent;