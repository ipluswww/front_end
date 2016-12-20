class ConfirmDialogCtrl {

    constructor($mdDialog, template, continueResp) {
        this.template = template;
        this.$mdDialog = $mdDialog;
        this.continueResp = continueResp;
    }

    continue() {
        this.$mdDialog.hide(this.continueResp);
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

ConfirmDialogCtrl.$inject = ['$mdDialog', 'template', 'continueResp'];

export default ConfirmDialogCtrl;