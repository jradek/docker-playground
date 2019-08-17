import React, { Component } from "react";

const SetupView = props => {
  return (
    <div className="card-panel">
      <div className="row">
        <h5 className="col center s12">Setup</h5>
      </div>
      {/* <div className="progress big">
        <div
          className="determinate"
          style={{ width: `${props.valuePercent}%` }}
        />
      </div> */}
    </div>
  );
};

const IntervalState = {
  SETUP: "setup",
  ROUND_PREPARE: "round_prepare",
  ROUND_RUNNING: "round_running",
  ROUND_PAUSE: "round_pause"
};

class IntervalTimer extends Component {
  state = {
    state: IntervalState.SETUP
  };

  getCurrentView = () => {
    switch (this.state.state) {
      case IntervalState.SETUP:
        return <SetupView />;
      default:
        return <h5>oops</h5>;
    }
  };

  render() {
    return (
      <div>
        <h2>IntervalTimer</h2>
        <div className="row">{this.getCurrentView()}</div>
      </div>
    );
  }
}

export default IntervalTimer;
