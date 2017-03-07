import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';

const renderInput = (field) => {
	const { label, type, input, meta: { error, touched } } = field;
	return (
		<div>
			<label>{label}:</label>
			<input {...input} type={type}
				className="form-control" />
				{touched && error && <div className="error">{error}</div>}
		</div>
	);
}

class Signup extends Component {
	handleFormSubmit(formProps) {
		this.props.signupUser(formProps);
	}
	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Sorry.</strong> {this.props.errorMessage}
				</div>
			);
		}
	}
	render() {
		const { handleSubmit } = this.props;
		return ( 
			<div>
				<Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<div className="form-group">
						<Field name="email"  type="email" component={renderInput} label="Email" />
					</div>
					<div className="form-group">
						<Field name="password" type="password" component={renderInput} label="Password" />
					</div>
					<div className="form-group">
						<Field name="PasswordConfirm" type="password" component={renderInput} label="Confirm" />
					</div>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Sign up</button>
				</Form>
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

function mapStateToProps(state){
	return {
		errorMessage: state.auth.error
	};
}

const form = reduxForm({ form: 'signup', validate})

export default connect(mapStateToProps, actions)(form(Signup));