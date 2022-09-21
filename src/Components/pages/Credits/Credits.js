import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import { Link } from 'react-router-dom';
import './Credits.scss';

function Credits() {
	return (
		<>
			<div className="back-button">
				<Link to="/">
					<Button label="Back" icon={faArrowLeft} />
				</Link>
			</div>
			<div className="credits">
				<div className="credits-header">
					<h1 className="credits-title">Credits</h1>
					<div>
						<h2>GetTam is brought to you by the Tam CS Club</h2>
					</div>
				</div>
				<div className="credits-list">
					<div className="credits-item">
						<a href="https://github.com/nekumelon">
							<h2>Caden Marinozzi</h2>
						</a>
						<h4>GetTam V2, Front-End, Back-End, Security</h4>
					</div>
					<div className="credits-item">
						<a href="https://github.com/lankmann">
							<h2>Linus Tornqvist</h2>
						</a>
						<h4>GetTam V1, Gameplay and Graphics</h4>
					</div>
					<div className="credits-item">
						<a href="https://github.com/fosterea">
							<h2>Foster Angus</h2>
						</a>
						<h4>GetTam V1, Front-End</h4>
					</div>
					<div className="credits-item">
						<h2>Adnan Ashraf</h2>
						<h4>GetTam V1, Back-End</h4>
					</div>
					<div className="credits-item">
						<h2>Mohamad Mamoon, Garrett Mason</h2>
						<h4>Research and Testing</h4>
					</div>
					<div className="credits-item built-with">
						<h2 className="built-with-title">Built With</h2>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207"
							alt="React"
							height={50}
						/>
						<img
							src="https://miro.medium.com/max/300/1*h9G7gjWQeQVwqkbhHVvOQg.png"
							alt="P5.js"
							height={50}
						/>
						<img
							src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
							alt="Firebase"
							height={50}
						/>
						<img
							src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
							alt="Node.js"
							height={50}
						/>
						<img
							alt="SASS"
							src="https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"
							height={50}
						/>
					</div>
					<h1>❤️</h1>
				</div>
			</div>
		</>
	);
}

export default Credits;
