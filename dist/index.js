(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["frappe-gantt-react"] = factory();
	else
		root["frappe-gantt-react"] = factory();
})(this, function() {
return webpackJsonpfrappe_gantt_react([1],{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(7);
var Gantt = __webpack_require__(12);
var Task = /** @class */ (function () {
    function Task() {
    }
    Task.prototype.setDependencies = function (value) {
        this._dependencies = value;
    };
    Object.defineProperty(Task.prototype, "dependencies", {
        get: function () {
            return this._dependencies.join(", ");
        },
        set: function (value) {
            this._dependencies = value.split(",").map(function (d) { return d.trim(); });
        },
        enumerable: true,
        configurable: true
    });
    return Task;
}());
exports.Task = Task;
var ViewMode;
(function (ViewMode) {
    ViewMode["QuarterDay"] = "Quarter Day";
    ViewMode["HalfDay"] = "Half Day";
    ViewMode["Day"] = "Day";
    ViewMode["Week"] = "Week";
    ViewMode["Month"] = "Month";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var FrappeGantt = /** @class */ (function (_super) {
    __extends(FrappeGantt, _super);
    function FrappeGantt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrappeGantt.prototype.componentWillReceiveProps = function () {
        if (this._gantt) {
            this._gantt.change_view_mode(this.props.viewMode);
        }
    };
    FrappeGantt.prototype.componentDidMount = function () {
        var _this = this;
        this._gantt = new Gantt(this._svg, this.props.tasks, {
            on_click: this.props.onClick,
            on_view_change: this.props.onViewChange,
            on_progress_change: function (task, progress) {
                (_this.props.onProgressChange || function (a, b) { })(task, progress);
                (_this.props.onTasksChange || function (a) { })([].concat(_this.props.tasks));
            },
            on_date_change: function (task, start, end) {
                (_this.props.onDateChange || function (a, b, c) { })(task, start, end);
                (_this.props.onTasksChange || function (a) { })([].concat(_this.props.tasks));
            }
        });
        var midOfSvg = this._svg.clientWidth * 0.5;
        this._target.scrollLeft = midOfSvg;
    };
    FrappeGantt.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { overflow: "scroll" }, ref: function (r) { return _this._target = r; } },
            React.createElement("svg", { ref: function (r) { return _this._svg = r; }, width: "100%", height: "100%", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" })));
    };
    return FrappeGantt;
}(React.Component));
exports.FrappeGantt = FrappeGantt;


/***/ })

},[6]);
});