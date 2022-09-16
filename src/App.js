import Home from 'Components/pages/Home';
import Body from 'Components/shared/Body';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Body>
					<Routes>
						<Route path="*" element={<Home />} />
					</Routes>
				</Body>
			</BrowserRouter>
		);
	}
}

export default App;
