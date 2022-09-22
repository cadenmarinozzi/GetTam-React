import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import web from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './LegacyRequest.scss';

class LegacyRequest extends Component {
	constructor() {
		super();

		this.state = {};
	}

	componentDidMount() {}

	async submitRequest() {
		await web.sendLegacyRequest({
			email: this.state.email,
			username: this.state.username,
		});
	}

	render() {
		return (
			<>
				<div className="back-button">
					<Link to="/">
						<Button label="Back" icon={faArrowLeft} />
					</Link>
				</div>
				<div className="legacy-request">
					<h1 className="legacy-request-title">Legacy Request</h1>
					<span>
						Send an email to the following email with your username,
						school email, and any proof of ownership of the old
						account (If any): <b>gettammail@gmail.com</b>
					</span>
					{/* <Input
					label="Account Username"
					onChange={(username) => this.setState({ username })}
				/>
				<Input
					label="School Email"
					onChange={(email) => this.setState({ email })}
				/>
				<span>
					An email will be sent to your school email once your request
					has been accepted.
				</span>
				<Button
					label="Submit"
					onClick={this.submitRequest.bind(this)}
				/> */}
				</div>
			</>
		);
	}
}

export default LegacyRequest;
