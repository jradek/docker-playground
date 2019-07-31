import React, { Component } from "react";

// Class based component
class About extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle: `The about page`
    };
  }

  componentDidMount() {
    console.log("About did mount");
    this.setState({
      pageTitle: "About page changed in didMount"
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.pageTitle}</h2>
      </div>
    );
  }
}

export default About;
