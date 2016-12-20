const formattedPhoneNumberLink = () => {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            onClick: '&?',
            style: '=?'
        },
        template: '<a ng-style="style" ng-click="onClick()">{{formattedNumber}}</a>',
        link: (scope) => {
            scope.$watch('value', (value) => {
                if (value) {
                    let number = value;
                    if (value.indexOf('+1') == 0) number = value.slice(2);
                    scope.formattedNumber = '(' + number.substring(0,3) + ') ' +
                                            number.substring(3,6) + '-' + number.substring(6);
                }
            });
        }
    };
};

export default formattedPhoneNumberLink;