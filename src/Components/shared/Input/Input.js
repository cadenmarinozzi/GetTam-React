import './Input.scss';

function Input({ label, className, error, onChange, ...rest }) {
	return (
		<input
			className={`input ${className} ${
				error ? 'button-error' : 'button-primary'
			}`}
			onChange={(e) => onChange(e.target.value)}
			placeholder={label}
			{...rest}
		/>
	);
}

export default Input;
