import React, { Component } from "react";
import PropTypes from "prop-types";

const NumberInput = props => {
  const { text, value, onValueChange, step, bigStep } = props;
  return (
    <React.Fragment>
      <div className="col s12 center">
        <h5>{text}</h5>
      </div>
      <div className="input-field col s2">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onValueChange(value - bigStep);
          }}
        >
          {`-${bigStep}`}
        </button>
      </div>
      <div className="input-field col s2">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onValueChange(value - step);
          }}
        >
          {`-${step}`}
        </button>
      </div>
      <div className="input-field col s4">
        <input
          placeholder="seconds"
          type="number"
          value={value}
          min="5"
          onChange={e => {
            onValueChange(e.target.value);
          }}
        />
      </div>
      <div className="input-field col s2">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onValueChange(value + step);
          }}
        >
          {`+${step}`}
        </button>
      </div>
      <div className="input-field col s2">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onValueChange(value + bigStep);
          }}
        >
          {`+${bigStep}`}
        </button>
      </div>
    </React.Fragment>
  );
};

NumberInput.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  bigStep: PropTypes.number.isRequired
};

// -----------------------------------------------------------------------

const SetupView = props => {
  const { numRounds, roundLength, roundPause } = props.config;

  const onNumRoundsChange = props.onNumRoundsChange;
  const onRoundLengthChange = props.onRoundLengthChange;
  const onRoundPauseChange = props.onRoundPauseChange;

  return (
    <div className="row">
      <div className="col s12 center">
        <h5>Number of Rounds</h5>
      </div>
      <div className="input-field col s4">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onNumRoundsChange(numRounds - 1);
          }}
        >
          -
        </button>
      </div>
      <div className="input-field col s4">
        <input
          placeholder="rounds"
          type="number"
          value={numRounds}
          min="1"
          onChange={e => {
            onNumRoundsChange(e.target.value);
          }}
        />
      </div>
      <div className="input-field col s4">
        <button
          className="btn waves-effect"
          style={{ width: "100%" }}
          onClick={() => {
            onNumRoundsChange(numRounds + 1);
          }}
        >
          +
        </button>
      </div>
      {
        <NumberInput
          step={1}
          bigStep={10}
          onValueChange={onRoundLengthChange}
          value={roundLength}
          text={"Round Length"}
        />
      }
      {
        <NumberInput
          step={1}
          bigStep={5}
          onValueChange={onRoundPauseChange}
          value={roundPause}
          text={"Round Pause"}
        />
      }
    </div>
  );
};

SetupView.propTypes = {
  config: PropTypes.exact({
    numRounds: PropTypes.number.isRequired,
    roundLength: PropTypes.number.isRequired,
    roundPause: PropTypes.number.isRequired
  }),
  onNumRoundsChange: PropTypes.func.isRequired,
  onRoundLengthChange: PropTypes.func.isRequired,
  onRoundPauseChange: PropTypes.func.isRequired
};

// -----------------------------------------------------------------------

const IntervalState = {
  SETUP: "setup",
  ROUND: {
    PREPARE: "round_prepare",
    RUNNING: "round_running",
    PAUSE: "round_pause"
  }
};

// -----------------------------------------------------------------------

class IntervalTimer extends Component {
  state = {
    state: IntervalState.SETUP,
    config: {
      numRounds: 1,
      roundLength: 5,
      roundPause: 5
    }
  };

  onNumRoundsUpdate = v => {
    this.setState(prevState => ({
      ...prevState,
      config: {
        ...prevState.config,
        numRounds: Math.max(1, v)
      }
    }));
  };

  onRoundLengthUpdate = v => {
    this.setState(prevState => ({
      ...prevState,
      config: {
        ...prevState.config,
        roundLength: Math.max(5, v)
      }
    }));
  };

  onRoundPauseUpdate = v => {
    this.setState(prevState => ({
      ...prevState,
      config: {
        ...prevState.config,
        roundPause: Math.max(0, v)
      }
    }));
  };

  getCurrentView = () => {
    switch (this.state.state) {
      case IntervalState.SETUP:
        return (
          <SetupView
            config={this.state.config}
            onNumRoundsChange={this.onNumRoundsUpdate}
            onRoundLengthChange={this.onRoundLengthUpdate}
            onRoundPauseChange={this.onRoundPauseUpdate}
          />
        );
      default:
        return <h5>oops</h5>;
    }
  };

  render() {
    return (
      <div>
        <h2>IntervalTimer</h2>
        {this.getCurrentView()}
      </div>
    );
  }
}

export default IntervalTimer;
