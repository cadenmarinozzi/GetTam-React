import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import web from 'modules/web';
import { Component } from 'react';
import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async signUp() {
		// if (
		// 	this.state.username &&
		// 	this.state.password &&
		// 	(await web.signUp(this.state))
		// ) {
		// 	cookies.set('username', this.state.username);
		// 	cookies.set('password', this.state.password);
		// 	navigate('/');

		// 	this.setState({
		// 		error: false,
		// 	});
		// } else {
		// 	this.setState({
		// 		error: true,
		// 	});
		// }

		if (this.state.username) {
			const userId = cookies.get('user-id');
			await web.signUp({ userId, username: this.state.username });
			window.location.reload();

			this.setState({
				error: false,
			});
		} else {
			this.setState({
				error: true,
			});
		}
	}

	render() {
		return (
			<div className="signup-container">
				<div className="signup-header">
					<h2 className="signup-title">Sign Up</h2>
					<FontAwesomeIcon icon={faUser} />
				</div>
				<div className="signup-details">
					<Input
						label="Username"
						error={this.state.error}
						onChange={(username) => {
							this.setState({
								username,
							});
						}}
					/>
					{/* <Input
						label="Password"
						error={this.state.error}
						type="password"
						onChange={(password) => {
							this.setState({
								password,
							});
						}}
					/> */}
					<div className="signup-buttons">
						<Button
							label="Sign Up"
							onClick={this.signUp.bind(this)}
						/>
						{/* <span>or</span>
						<Link to="/login">
							<Button label="Login" regular />
						</Link> */}
					</div>
				</div>
			</div>
		);
	}
}

function SignUpWrapper() {
	const navigate = useNavigate();

	return <SignUp navigate={navigate} />;
}

export default SignUpWrapper;
