import React, { Component } from 'react'

import TemperatureInput from "./TemperatureInput";

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureCalculator extends Component {

    state = {
        temperature: '',
        scale: 'c'
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(scale, temperature) {
        this.setState({ "scale": scale, temperature })
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div className="row">
                <TemperatureInput scale="c" value={celsius} onValueChange={(value) => this.handleChange('c', value)} />
                <TemperatureInput scale="f" value={fahrenheit} onValueChange={(value) => this.handleChange('f', value)} />
            </div>
        )
    }
}

export default TemperatureCalculator;
