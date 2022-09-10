import Home from 'Components/pages/Home';
import Body from 'Components/shared/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
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

export default App;
