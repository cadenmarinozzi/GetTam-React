import Home from 'Components/pages/Home';
import Body from 'Components/shared/Body';
import { Component } from 'react';
import web from './modules/web';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import cookies from './modules/cookies';
import Login from 'Components/pages/Login';
import SignUp from 'Components/pages/SignUp';
import Leaderboard from 'Components/pages/Leaderboard';
import Credits from 'Components/pages/Credits';
import { v4 as uuid } from 'uuid';
import LegacyRequest from 'Components/pages/LegacyRequest';
import './App.scss';
import Footer from 'Components/containers/Footer';
import TermsAndConditions from 'Components/pages/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from 'Components/pages/PrivacyPolicy';

class App extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		web.addSiteView();

		if (!cookies.get('user-id')) {
			const userId = uuid();
			cookies.set('user-id', userId);

			this.setState({
				loaded: true,
			});
		} else {
			const userId = cookies.get('user-id');
			const scoreData = await web.getScoreData(userId);

			if (!scoreData) {
				const userId = uuid();
				cookies.set('user-id', userId);
				this.setState({ loaded: true });

				return;
			}

			cookies.set('best-school', scoreData.school);
			cookies.set('best-score', scoreData.score);

			this.setState({ loggedIn: true, loaded: true });
		}
	}

	render() {
		const routes = this.state.loggedIn ? (
			<Body>
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/credits" element={<Credits />} />
					<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
					<Route
						path="/termsAndConditions"
						element={<TermsAndConditions />}
					/>
				</Routes>
			</Body>
		) : (
			<Routes>
				<Route path="*" element={<SignUp />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
				<Route
					path="/termsAndConditions"
					element={<TermsAndConditions />}
				/>
				<Route
					path="/legacy-request"
					element={
						<Body>
							<LegacyRequest />
						</Body>
					}
				/>
			</Routes>
		);

		return (
			this.state.loaded && (
				<BrowserRouter>
					<div className="content">{routes}</div>
					<Footer />
				</BrowserRouter>
			)
		);
	}
}

export default App;
