import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
	return (
		<div className="footer">
			<Link to="/termsAndConditions" className="footer-button">
				Terms of Service
			</Link>
			<Link to="/privacyPolicy" className="footer-button">
				Privacy Policy
			</Link>
			<span>@2023 GetTam</span>
			<div className="footer-links">
				<a href="https://GitHub.com/nekumelon/GetTam-React">
					<FontAwesomeIcon
						className="footer-button"
						icon={faGithub}
					/>
				</a>
			</div>
		</div>
	);
}

export default Footer;
