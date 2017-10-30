import * as React from 'react';

import { FrappeGantt, Task } from '../src/index';

const tasks = [
    {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2016-12-28',
        end: '2016-12-31',
        progress: 20,
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
        progress: 20,
        dependencies: 'Task 2, Task 1'
    }
]

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('test');
    }

    render() {
        return (
            <div>
                <FrappeGantt tasks={tasks} />
            </div>
        )
    }
}

export default Example;