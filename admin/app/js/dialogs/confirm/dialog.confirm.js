import BaseDialog from '../base/dialog.base';

class ConfirmDialog extends BaseDialog {

    constructor($mdDialog, $rootScope) {
        const getDefaultOptions = () => {
            return {
                templateUrl: 'templates/dialogs/dialog.confirm.html',
                scope: $rootScope.$new(true),
                escapeToClose: false,
                locals: {
                    template: {},
                    continueResp: null
                },
                controller: 'ConfirmDialogCtrl',
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

    withContinueText(continueText) {
        this.options.locals.template.continueText = continueText;
        return this;
    }

    withCancelText(cancelText) {
        this.options.locals.template.cancelText = cancelText;
        return this;
    }

    withContinueResp(resp) {
        this.options.locals.continueResp = resp;
        return this;
    }
}

ConfirmDialog.$inject = ['$mdDialog', '$rootScope'];

export default ConfirmDialog;
