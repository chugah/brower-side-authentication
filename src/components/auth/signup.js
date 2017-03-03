import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps) {
		this.props.signupUser(formProps);
	}
	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Sorry.</strong> {this.props.errorMessage}
				</div>
			)
		}
	}
	render() {
		const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
		return ( 
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Email:</label>
						<input type="email" className="form-control" {...email} placeholder="youremail.@email.com"/>
					</fieldset>
					<fieldset className="form-group">
						<label>Password:</label>
						<input type="password" className="form-control" {...password} placeholder="123456" />
					</fieldset>
					<fieldset className="form-group">
						<label>Re-enter Password:</label>
						<input type="password" className="form-control" {...passwordConfirm} placeholder="123456" />
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Sign up</button>
				</form>
			</div>
		);
	}
}

function validate(formProps) {
	const errors = {};
	Object.keys(formProps).forEach((key) => {
		if (!formProps[key]) {
			switch(key) {
				case 'email':
					errors[key] = 'Please enter your email address.';
					break;
				case 'password':
					errors[key] = 'Please enter your password.';
					break;
				case 'passwordConfirm':
					errors[key] = 'Please enter your password again.';
			}
		}
	});
	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = 'Passwords must be the same.';
	}
	return errors;
}

export default reduxForm({
	form: 'signup',
	fields: [ 'email', 'password', 'passwordConfirm' ],
	validate
}, ({ auth: {error} }) => { return {errorMessage: error}; })(Signup);