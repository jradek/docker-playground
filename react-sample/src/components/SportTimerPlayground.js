import React, { Component } from "react";

const SimpleDisplay = props => {
  return (
    <div className="card-panel">
      <div className="row">
        <h5 className="col s10">Seconds remaining</h5>
        <h5 className="col s2 right-align">{props.value}</h5>
      </div>
      <div className="progress big">
        <div
          className="determinate"
          style={{ width: `${props.valuePercent}%` }}
        />
      </div>
    </div>
  );
};

class SportTimer2 extends Component {
  state = {
    interval: 0,
    value: 0,
    valuePercent: 100,
    wallclockStartMs: -1,
    wallclockDeadlineMs: -1,
    timer: null,
    voice: null
  };

  constructor() {
    super();
    // This binding is necessary to make `this` work in the callback
    this.removeTimer = this.removeTimer.bind(this);
  }

  componentDidMount() {
    const self = this;
    const voiceName = "Alex";
    window.speechSynthesis.onvoiceschanged = function(e) {
      var voices = speechSynthesis.getVoices();

      voices.forEach(v => {
        if (v.name === voiceName) {
          self.setState({ voice: v });
          self.announce(`Speech synthesis available`, 1.0);
        }
      });
    };
  }

  removeTimer() {
    if (this.state.timer !== null) {
      // console.log("remove old timer");
      clearInterval(this.state.timer);
      this.setState({ timer: null });
    }
  }

  timerFunc = () => {
    // console.log("tick");

    const now = new Date().getTime();
    const finished = now > this.state.wallclockDeadlineMs;

    if (finished) {
      this.removeTimer();
      this.setState({
        value: 0,
        valuePercent: 100,
        wallclockStartMs: -1,
        wallclockDeadlineMs: -1
      });

      this.announce(`Finished`);
      return;
    }

    const raw = this.state.wallclockDeadlineMs - now;
    const rounded = Math.round(raw / 1000.0);
    const percent = Math.round(
      ((now - this.state.wallclockStartMs) /
        (this.state.wallclockDeadlineMs - this.state.wallclockStartMs)) *
        100
    );

    // console.log(
    //   "update raw = ",
    //   raw,
    //   ", rounded = ",
    //   rounded,
    //   ", percent ",
    //   percent
    // );

    this.setState({ value: rounded, valuePercent: percent });
  };

  announce = (text, rate = 1.3) => {
    const voice = this.state.voice;
    if (voice) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.lang = "en-US";
      msg.voice = voice;
      msg.rate = rate;
      msg.onend = () => {
        console.log(`Finished speaking "${text}"`);
      };
      window.speechSynthesis.speak(msg);
    }
  };

  handleStart = () => {
    this.removeTimer();
    const wallclockStartMs = new Date().getTime();
    const wallclockDeadlineMs = wallclockStartMs + this.state.interval * 1000;

    // check whether interval is long enough
    if (this.state.interval >= 5) {
      this.announce(`Started ${this.state.interval} second timer`);
    }

    this.setState({
      value: this.state.interval,
      valuePercent: 0,
      wallclockStartMs,
      wallclockDeadlineMs,
      // run timer in a slightly higher update rate
      timer: setInterval(this.timerFunc, 800)
    });
  };

  handleStop = () => {
    // console.log("stop pressed");

    if (this.state.timer === null) {
      return;
    }
    this.setState({ value: 0, valuePercent: 0 });
    this.removeTimer();
  };

  render() {
    return (
      <div>
        <h2>Sport Interval Timer</h2>
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="seconds"
              id="interval"
              type="number"
              value={this.state.interval}
              min="0"
              onChange={e => {
                this.setState({ interval: e.target.value });
              }}
            />
            <label htmlFor="interval">Interval in seconds</label>
          </div>
          <div className="input-field col s3">
            <button
              className="btn waves-effect"
              style={{ width: "100%" }}
              onClick={this.handleStart}
            >
              Start
            </button>
          </div>
          <div className="input-field col s3">
            <button
              className="btn waves-effect"
              style={{ width: "100%" }}
              onClick={this.handleStop}
            >
              Stop
            </button>
          </div>
        </div>
        <SimpleDisplay
          value={this.state.value}
          valuePercent={this.state.valuePercent}
        />
      </div>
    );
  }
}

export default SportTimer2;
