import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import web from 'modules/web';
import { navigate } from 'modules/utils';
import { Component } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async login() {
		if (this.state.username && this.state.password) {
			try {
				if (await web.login(this.state)) {
					cookies.set('username', this.state.username);
					cookies.set('password', this.state.password);
					navigate('/');

					this.setState({
						error: false,
					});

					return;
				}
			} catch (err) {
				this.setState({
					error: true,
				});
			}
		}

		this.setState({
			error: true,
		});
	}

	render() {
		return (
			<div className="login-container">
				<div className="login-header">
					<h2 className="login-title">Login</h2>
					<FontAwesomeIcon icon={faUser} />
				</div>
				<div className="login-details">
					<Input
						label="Username"
						error={this.state.error}
						onChange={(username) => {
							this.setState({
								username,
							});
						}}
					/>
					<Input
						label="Password"
						error={this.state.error}
						type="password"
						onChange={(password) => {
							this.setState({
								password,
							});
						}}
					/>
					<Link to="/legacy-request">
						<span className="returning-user-label">
							Coming from GetTam V1? Click to request account
							access.
						</span>
					</Link>
					<div className="login-buttons">
						<Button label="Login" onClick={this.login.bind(this)} />
						<span>or</span>
						<Link to="/signUp">
							<Button label="Sign Up" regular />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
