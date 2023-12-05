// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

const endpoint = 'https://webapis.bloomtechdev.com/registration';

const e = { // This is a dictionary of validation error messages.
  // username
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.

const initialForm = {
  name: '',
  favLanguage: '',
  favFood: '',
  agree: false,
}

export default function App() {
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, 
  const [form, setForm] = useState(initialForm)
  // (2) the validation errors,
  const [errors, setErrors] = useState(null)
  // (3) whether submit is disabled, 
  const [canSubmit, setToSubmit] = useState(form.agree)
  // (4) the success message from the server,
  const [serverSuccess, setServerSuccess] = useState('')
  // and (5) the failure message from the server.
  const [serverFailure, setServerFailure] = useState('');

  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
  }

  const onSubmit = evt => {
		// ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
		// Lots to do here! Prevent default behavior,
		evt.preventDefault();
		// disable the form to avoid double submits,
		setToSubmit(form.agree);
		// and POST the form data to the endpoint. 
    axios.post(endpoint, form)
      .then(res => {
        setServerSuccess(res.message)
        setServerFailure('')
        setForm(initialForm)
      })
      .catch(err => {
        setServerFailure(err.message)
        setServerSuccess('')
      })
    // On success, reset the form. 
    // You must put the success and failure messages from the server
		// in the states you have reserved for them, and the form
		// should be re-enabled.
	}

  function DisplayMessage(){
    if (!serverSuccess && !serverFailure) {
      return ''
    } else if (serverSuccess) {
      return <h4 className='success'>{serverSuccess}</h4>;
    } else if (serverFailure) {
      return <h4 className='error'>{serverFailure}</h4>;
    }
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit}>
        <DisplayMessage />
        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            placeholder="Type Username" />
          <div className="validation">username is required</div>
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input 
                type="radio" 
                name="favLanguage" 
                value="javascript" />
              JavaScript
            </label>
            <label>
              <input 
                type="radio" 
                name="favLanguage" 
                value="rust" />
              Rust
            </label>
          </fieldset>
          <div className="validation">favLanguage is required</div>
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select 
            id="favFood" 
            name="favFood">
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          <div className="validation">favFood is required</div>
        </div>

        <div className="inputGroup">
          <label>
            <input 
              id="agreement" 
              type="checkbox" 
              name="agreement" />
            Agree to our terms
          </label>
          <div className="validation">agreement is required</div>
        </div>

        <div>
          <input 
            type="submit" 
            disabled={!canSubmit} />
        </div>
      </form>
    </div>
  )
}
