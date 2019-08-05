import React, { useState, useEffect } from 'react';


const delayMilliSec = ms => new Promise(res => setTimeout(res, ms));

// ****************************************************************************

const BasicHooksExample = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="row">
      <div className="col s12"><h5>useState() hook example</h5></div>
      <button className="col s4 waves-effect waves-light btn-small" onClick={() => setCounter(v => (v + 1))}>Increase</button>
      <div className="col s4 center">Value: {counter}</div>
      <button className="col s4 waves-effect waves-light btn-small" onClick={() => setCounter(v => (v - 1))}>Decrease</button>
    </div>)
}

// ****************************************************************************

// this is a generic form hook, which could be applied to any form
const useFormHook = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  return [
    values, e => {
      setValues({
        // keep old values
        ...values,
        // we update its value based on then 'name' property of the input field
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
      <div className="col s12"><h5>custom hooks</h5></div>
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

// ****************************************************************************
// see: https://www.youtube.com/watch?v=f687hBjwFcM&list=PL9VMWoQ0LdqGT_Ql-ojVrreXrlVRvutIZ&index=2&t=1167s

// generic fetch of 'url' with optional 'delay'
const useFetch = ({ url, delayMSec = 500 }) => {
  const [state, setState] = useState({ data: null, isLoading: true });

  useEffect(() => {
    setState({ data: null, isLoading: true });

    delayMilliSec(delayMSec)
      .then(() => {
        fetch(url)
          .then(x => x.text())
          .then(y => {
            setState({ data: y, isLoading: false })
          })
      });
  },
    // effect is triggered whenever the url changes or the delay
    [url, delayMSec]
  );

  return state;
}

const EffectHookExample = () => {
  const [number, setNumber] = useState(0);

  // destructuring with renaming:
  // rename the generic 'data' to numberTrivia
  // see: https://wesbos.com/destructuring-renaming/
  const { data: numberTrivia, isLoading } = useFetch(
    { url: `http://numbersapi.com/${number}/trivia` });

  return (
    <div className="row">
      <div className="col s12">
        <h5>useEffect()</h5>
      </div>
      <button className="col s2 waves-effect waves-light btn-small"
        onClick={() => {
          // a button press changes the number
          //  which changes the URL
          //  which triggers the effect
          setNumber(n => n + 1)
        }}>Next</button>
      <div className="col s2"><h6>{number}</h6></div>
      <div className="col s8">
        {isLoading ? "Loading ..." : numberTrivia}
      </div>
    </div>
  )
}

// ****************************************************************************

const Hooks = () => {
  return (
    // <div>
    <div>
      <h2>Hooks</h2>
      <div className="row"><div className="col s12"><p>The contents of this site is based on this <a href="https://www.youtube.com/watch?v=f687hBjwFcM">tutorial</a></p></div></div>
      <BasicHooksExample />
      <FormHooksExample />
      <EffectHookExample />
    </div>
    // </div>
  )
}

export default Hooks;
