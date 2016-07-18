var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function () {
        return {
            count: 0,
            timerStatus: 'stopped'
        };
    },

    // Called after update to the application
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }
    },

        // Called before the component dies (like by switching to a new page)
    componentWillUnmount: function () {
        clearInterval(this.timer);
        this.timer = undefined;
    },

    startTimer: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count + 1;
            this.setState({
                count: newCount >= 0 ? newCount : 0
            });
        }, 1000);
    },

    handleSetTimer: function (seconds) {
        this.setState({
            count: seconds,
            timerStatus: 'started'
        });
    },

    handleStatusChange: function (newStatus) {
        this.setState({timerStatus: newStatus});
    },

    render: function () {
        var {count, timerStatus} = this.state;

        var renderControlArea = () => {
            return (
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            );
        };

        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        );
    }
});

module.exports = Timer;
