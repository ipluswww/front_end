const PhoneInput = {
	templateUrl: 'templates/components/phone-input.component.html',
	bindings: {
		number: '=cbNumber',
		label: '@?cbLabel',
		required: '<?cbRequired',
		disabled: '<?cbDisabled'
	}
};

export default PhoneInput;