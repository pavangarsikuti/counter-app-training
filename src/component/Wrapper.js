import React, { Component } from "react";
import Counter from "./Counter";

export default class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      count: "",
      showCount: true,
      startTime: false
    };
  }

  startCounter = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showCount: true,
        startTime: true,
        value: Number(this.state.count),
        count: ""
      };
    });
  };

  stopCounter = () => {
    this.setState({ startTime: false });
  };

  handleRemoveCounter = () => {
    clearInterval(this.interval);
    this.setState((prevState) => {
      return {
        ...prevState,
        value: 0,
        count: "",
        showCount: false,
        startTime: false
      };
    });
  };

  handleChange = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        count: e.target.value
      };
    });
  };

  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({ showWelcome: false });
    }, 3000);
  }
  componentDidUpdate() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.state.startTime) {
      this.interval = setInterval(() => {
        this.setState((prevState) => {
          return {
            value: prevState.value + 1
          };
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Counter App</h1>
          {this.state.showCount && <Counter startFrom={this.state.value} />}
          <input
            type="number"
            placeholder="Enter..."
            value={this.state.count}
            onChange={this.handleChange}
          />
          <div>
            <button style={{color: "green"}} onClick={this.startCounter}>START</button>
            <br />
            <button  style={{color: "red"}} onClick={this.stopCounter}>STOP</button>
            <br />
            <button style={{color: "blue"}} onClick={this.handleRemoveCounter}>DELETE</button>
          </div>
        </div>
      </div>
    );
  }
}
