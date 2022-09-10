import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

function Button({ label, icon, danger, className, ...rest }) {
	return (
		<button
			className={`button ${className} button-${
				danger ? 'danger' : 'default'
			}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{label}
		</button>
	);
}

export default Button;
