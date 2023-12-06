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
const formSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required()
    .min(3, e.usernameMin)
    .max(20, e.usernameMax),
  favLanguage: yup
    .string()
    .required()
    .oneOf(['javascript', 'rust'], e.favLanguageRequired),
    favFood: yup
      .string()
      .required()
      .oneOf(['pizza', 'spaghetti', 'broccoli'], e.favFoodOptions),
    agreement: yup
      .boolean()
      .required()
      .oneOf([true], e.agreementOptions)

    
})



const initialForm = {
  username: '',
  favLanguage: '',
  favFood: '',
  agreement: false,
}

const initialErrors = {
	name: '',
	favLanguage: '',
	favFood: '',
	agreement: ''
};

export default function App() {
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, 
  const [form, setForm] = useState(initialForm)
  // (2) the validation errors,
  const [errors, setErrors] = useState(initialErrors)
  // (3) whether submit is disabled, 
  const [disabled, changeDisabled] = useState(!initialForm.agreement)
  // (4) the success message from the server,
  const [serverSuccess, setServerSuccess] = useState('')
  // and (5) the failure message from the server.
  const [serverFailure, setServerFailure] = useState('');

  useEffect( () => {
    formValidation()
}, [form]) 

  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then( () => setErrors({ ...errors, [name]: ''}))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0]}))
  }

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    let { name, value } = evt.target
    if (name === 'agreement') {
      value = !form.agreement
    }
    setForm({...form, [name]: value})
    validate(name, value)
    
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
  }

function formValidation() {
  formSchema.isValid(form)
    .then(res => {
      if (res) {
        changeDisabled(initialForm.agreement);
      }
    })
    .catch(err => console.log(err))
}

  const onSubmit = evt => {
		// ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
		// Lots to do here! Prevent default behavior,
		evt.preventDefault();
		// disable the form to avoid double submits,
		changeDisabled(!initialForm.agreement);
		// and POST the form data to the endpoint. 
    console.log('we submitted')
    axios.post(endpoint, form)
      .then(res => {
        setForm(initialForm)
        setServerSuccess(res.data.message)
        setServerFailure('')
      })
      .catch(err => {
        setServerFailure(err.response.data.message)
        setServerSuccess('')
      })
    // On success, reset the form. 
    // You must put the success and failure messages from the server
		// in the states you have reserved for them, and the form
		// should be re-enabled.
	}

  // function DisplayMessage(){
  //   if (!serverSuccess && !serverFailure) {
  //     return ''
  //   } else if (serverSuccess) {
  //     return <h4 className='success'>{serverSuccess}</h4>;
  //   } else if (serverFailure) {
  //     return <h4 className='error'>{serverFailure}</h4>;
  //   }
  // }

  return (
		<div>
			{' '}
			{/* TASK: COMPLETE THE JSX */}
			<h2>Create an Account</h2>
			<form onSubmit={onSubmit}>
				{serverSuccess && <h4 className='success'>{serverSuccess}</h4>}
				{serverFailure && <h4 className='error'>{serverFailure}</h4>}
				<div className='inputGroup'>
					<label htmlFor='username'>Username:</label>
					<input
						id='username'
						name='username'
						type='text'
						onChange={onChange}
						placeholder='Type Username'
						value={form.username}
					/>

					{errors.username && (
						<div className='validation'>{errors.username}</div>
					)}
				</div>

				<div className='inputGroup'>
					<fieldset>
						<legend>Favorite Language:</legend>
						<label>
							<input
								type='radio'
								onChange={onChange}
								name='favLanguage'
								value='javascript'
								checked={form.favLanguage === 'javascript'}
							/>
							JavaScript
						</label>
						<label>
							<input
								type='radio'
								checked={form.favLanguage === 'rust'}
								onChange={onChange}
								name='favLanguage'
								value='rust'
							/>
							Rust
						</label>
					</fieldset>
					{errors.favLanguage && (
						<div className='validation'>{errors.favLanguage}</div>
					)}
				</div>

				<div className='inputGroup'>
					<label htmlFor='favFood'>Favorite Food:</label>
					<select
						id='favFood'
						value={form.favFood}
						onChange={onChange}
						name='favFood'
					>
						<option value=''>-- Select Favorite Food --</option>
						<option value='pizza'>Pizza</option>
						<option value='spaghetti'>Spaghetti</option>
						<option value='broccoli'>Broccoli</option>
					</select>
					{errors.favFood && <div className='validation'>{errors.favFood}</div>}
				</div>

				<div className='inputGroup'>
					<label>
						<input
							id='agreement'
							checked={form.agreement}
							onChange={onChange}
							type='checkbox'
							name='agreement'
						/>
						Agree to our terms
					</label>
					{errors.agreement && (
						<div className='validation'>{errors.agreement}</div>
					)}
				</div>

				<div>
					<input type='submit' disabled={disabled} />
				</div>
			</form>
		</div>
	);
}
