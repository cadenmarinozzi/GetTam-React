import Title from './Components/Title';
import GridContainer from './Components/GridContainer';
import Footer from './Components/Footer';
import { useState } from 'react';
import ViewsChart from 'Components/ViewsChart';
import PlayersChart from 'Components/PlayersChart';
import InvalidPlayersChart from 'Components/InvalidPlayersChart';
import InappropriateUsersChart from 'Components/InappropriateUsersChart';
import LeaderboardChart from 'Components/LeaderboardChart';

function App() {
	let [theme, setTheme] = useState('light');

	return (
		<>
			<Footer setTheme={setTheme}>
				<Title>GetTam Analytics</Title>
			</Footer>

			<GridContainer>
				<ViewsChart theme={theme} />
				<PlayersChart theme={theme} />
				<LeaderboardChart theme={theme} />
			</GridContainer>

			<GridContainer>
				<InvalidPlayersChart theme={theme} />
				<InappropriateUsersChart theme={theme} />
			</GridContainer>
		</>
	);
}

export default App;
