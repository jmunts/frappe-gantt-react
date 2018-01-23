/// <reference types="moment" />
/// <reference types="react" />
import * as React from "react";
import { Moment } from "moment";
export declare class Task {
    private _dependencies?;
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
    setDependencies?(value: string[]): void;
    dependencies: string;
}
export declare enum ViewMode {
    QuarterDay = "Quarter Day",
    HalfDay = "Half Day",
    Day = "Day",
    Week = "Week",
    Month = "Month",
}
export interface FrappeGanttProps {
    tasks: Task[];
    viewMode?: ViewMode;
    onTasksChange?: (tasks: Task[]) => void;
    onClick?: (task: Task) => void;
    onDateChange?: (task: Task, start: Moment, end: Moment) => void;
    onProgressChange?: (task: Task, progress: number) => void;
    onViewChange?: (mode: ViewMode) => void;
}
export declare class FrappeGantt extends React.Component<FrappeGanttProps, any> {
    private _target;
    private _svg;
    private _gantt;
    componentWillReceiveProps(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
