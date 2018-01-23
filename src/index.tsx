import * as React from "react";
import { render } from "react-dom";
import * as Gantt from "frappe-gantt";
import { AppContainer } from "react-hot-loader";
import { Moment } from "moment";

export class Task {
    private _dependencies?: string[];

    id: string;
    name: string;
    start: string;
    end: string;
    
    /**
     * Progress in percentage
     */
    progress: number;

    /**
     * A css custom class for the task chart bar
     */
    custom_class?: string;

    setDependencies?(value: string[]) {
        this._dependencies = value;
    }

    set dependencies(value: string) {
        this._dependencies = value.split(",").map(d => d.trim());
    }

    get dependencies(): string {
        return this._dependencies.join(", ");
    }
}

export enum ViewMode {
    QuarterDay = "Quarter Day",
    HalfDay = "Half Day",
    Day = "Day",
    Week = "Week",
    Month = "Month"
}

export interface FrappeGanttProps {
    idName: string;
    tasks: Task[];
    viewMode?: ViewMode;
    onTasksChange?: (tasks: Task[]) => void;
    onClick?: (task: Task) => void;
    onDateChange?: (task: Task, start: Moment, end: Moment) => void;
    onProgressChange?: (task: Task, progress: number) => void;
    onViewChange?: (mode: ViewMode) => void;
}

export class FrappeGantt extends React.Component<FrappeGanttProps, any> {
    private _target: HTMLDivElement;
    private _svg: SVGElement;
    private _gantt: any;

    componentWillReceiveProps() {
        if (this._gantt) {
            this._gantt.change_view_mode(this.props.viewMode);
        }
    }

    componentDidMount() {
        this._gantt = new Gantt(`#${this.props.idName}`, this.props.tasks, {
            on_click: this.props.onClick,
            on_view_change: this.props.onViewChange,
            on_progress_change: (task: Task, progress: number) => {
                (this.props.onProgressChange || function (a, b) { })(task, progress);
                (this.props.onTasksChange || function (a) { })([].concat(this.props.tasks));
            },
            on_date_change: (task: Task, start: Moment, end: Moment) => {
                (this.props.onDateChange || function (a, b, c) { })(task, start, end);
                (this.props.onTasksChange || function (a) { })([].concat(this.props.tasks));
            }
        });

        const midOfSvg = this._svg.clientWidth * 0.5;
        this._target.scrollLeft = midOfSvg;
    }

    render() {
        return (
            <div style={{ overflow: "scroll" }} ref={r => this._target = r}>
                <svg ref={r => this._svg = r}
                    id={this.props.idName}
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                </svg>
            </div>);
    }
}
