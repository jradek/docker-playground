import React, { useState } from 'react'
import PropTypes from 'prop-types'


const generateUniqueId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}


const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};


const TemperatureInput = (props) => {

    // state hook
    const [componentID] = useState(() => generateUniqueId())

    const handleChange = event => props.onValueChange(event.target.value);
    const temperature = props.value;
    const scale = props.scale;

    return (
        <div className="input-field col s12 m6">
            <input placeholder="temperature value" id={componentID} type="text" value={temperature} onChange={handleChange} />
            <label htmlFor={componentID}>Enter temperature in {scaleNames[scale]}</label>
        </div>
    );
}

TemperatureInput.propTypes = {
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    scale: PropTypes.string.isRequired,
}


export default TemperatureInput;