import * as React from 'react';

import { FrappeGantt, Task, ViewMode } from '../src/index';

const tasks = [
    {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2016-12-28',
        end: '2016-12-31',
        progress: 10,
        dependencies: ''
    },
    {
        id: 'Task 2',
        name: 'Redesign website',
        start: '2016-12-28',
        end: '2016-12-31',
        progress: 20,
        dependencies: 'Task 1'
    },
    {
        id: 'Task 3',
        name: 'Redesign website',
        start: '2016-12-28',
        end: '2016-12-31',
        progress: 0,
        dependencies: 'Task 2, Task 1'
    }
]

class Example extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {mode: ViewMode.HalfDay};
                
        setTimeout(() => {
            console.log("Setting State!");
            this.setState({mode: ViewMode.Month});
        }, 3000);
    }

    componentDidMount() {
        console.log('test');
    }

    render() {
        return (
            <div>
                <FrappeGantt tasks={tasks} viewMode={this.state.mode} />
            </div>
        )
    }
}

export default Example;