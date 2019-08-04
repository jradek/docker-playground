import React, { useState } from 'react';

const BasicHooksExample = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="row">
      <div className="col s12"><p>useState() hook example</p></div>
      <button className="col s4 waves-effect waves-light btn-small" onClick={() => setCounter(v => (v + 1))}>Increase</button>
      <div className="col s4 center">Value: {counter}</div>
      <button className="col s4 waves-effect waves-light btn-small" onClick={() => setCounter(v => (v - 1))}>Decrease</button>
    </div>)
}

// this is a generic form hook, which could be applied to any form
const useFormHook = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  return [
    values, e => {
      setValues({
        // keep old values
        ...values,
        // based on name property of the input field
        // we update its value
        [e.target.name]: e.target.value
      });
      console.log("useFormHook, updated ", e.target.name)
    }
  ]
}

const FormHooksExample = () => {
  const [values, handleChange] = useFormHook({ email: "", password: "" });

  return (
    <div className="row">
      <div className="col s12"><p>custom hooks</p></div>
      <div className="input-field col s12 m6">
        <input placeholder="email" name="email" type="text" value={values.email} onChange={handleChange} />
      </div>
      <div className="input-field col s12 m6">
        <input placeholder="password" name="password" type="password" value={values.password} onChange={handleChange} />
      </div>
      <div className="col s12 center">{values.email}, {values.password}</div>
    </div>
  )
}

const Hooks = () => {

  return (
    // <div>
    <div>
      <h2>Hooks</h2>
      <div className="row"><div className="col s12"><p>The contents of this site is based on this <a href="https://www.youtube.com/watch?v=f687hBjwFcM">tutorial</a></p></div></div>
      <BasicHooksExample />
      <FormHooksExample />
    </div>
    // </div>
  )
}

export default Hooks;
