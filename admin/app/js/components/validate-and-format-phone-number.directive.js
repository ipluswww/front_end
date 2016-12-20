const validateAndFormatPhoneNumber = () => {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: (scope, element) => {
            const ngModel = element.controller('ngModel');
            const modelValueRegex = /^\+1\d{10}$/;
            const viewValueRegex  = /^\(\d{3}\)\s\d{3}-\d{4}$/;
            const formatViewValue = value => {
                if (typeof value !== 'string') return '';
                if (value.indexOf('+1') === 0) value = value.slice(2);

                const size = value.length;
                let formattedValue;

                if (size == 0) formattedValue = value;
                else if (size < 4) formattedValue = '(' + value;
                else if (size < 7) formattedValue = '(' + value.substring(0,3) + ') ' + value.substring(3,6);
                else formattedValue = '(' + value.substring(0,3) + ') ' + value.substring(3,6) + '-' + value.substring(6);
                return formattedValue;
            };

            // remove formatting 
            const parseViewValue = value => '+1' + value.replace(/([\)\(-\s])+/g, '');

            const phoneNumberValidator = (modelValue, viewValue) => viewValueRegex.test(viewValue);

            ngModel.$options = { allowInvalid: true, updateOnDefault: true };
            ngModel.$formatters.push(formatViewValue);
            ngModel.$parsers.push(parseViewValue);
            ngModel.$validators.valid = phoneNumberValidator;

            // workaround to run $formatters when model is changed
            scope.$watch(
                () => ngModel.$modelValue,
                () => ngModel.$modelValue = 'necessary to trigger $formatters'
            );
        }
    };
};

export default validateAndFormatPhoneNumber;