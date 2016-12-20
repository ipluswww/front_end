import BaseDialog from '../base/dialog.base';

class AlertDialog extends BaseDialog {

    constructor($mdDialog, $rootScope) {
        const getDefaultOptions = () => {
            return {
                templateUrl: 'templates/dialogs/dialog.alert.html',
                scope: $rootScope.$new(true),
                escapeToClose: false,
                locals: {
                    template: {
                        title: 'Alert',
                        okText: 'OK'
                    },
                    continueResp: null
                },
                controller: 'AlertDialogCtrl',
                controllerAs: 'ctrl'
            }
        };
        super($mdDialog, getDefaultOptions);
        this.getDefaultOptions = getDefaultOptions;
    }

    withTitle(title) {
        this.options.locals.template.title = title;
        return this;
    }

    withDescription(description) {
        this.options.locals.template.description = description;
        return this;
    }

    withOkText(okText) {
        this.options.locals.template.okText = okText;
        return this;
    }

    withContinueResp(resp) {
        this.options.locals.continueResp = resp;
        return this;
    }
}

AlertDialog.$inject = ['$mdDialog', '$rootScope'];

export default AlertDialog;
