import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

class Signin extends Component {
	handleFormSubmit( { email, password } ) {
		const { dispatch } = this.props;
		dispatch(actions.signinUser({ email, password }));
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
		const { handleSubmit, fields: { email, password } } = this.props;
		return ( 
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signin',
	fields: [ 'Email', 'password' ]
}, mapStateToProps, actions)(Signin);