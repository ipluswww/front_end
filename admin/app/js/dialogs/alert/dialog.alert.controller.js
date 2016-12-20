class AlertDialogCtrl {

    constructor($mdDialog, template, continueResp) {
        this.template = template;
        this.$mdDialog = $mdDialog;
        this.continueResp = continueResp;
    }

    ok() {
        this.$mdDialog.hide(this.continueResp);
    }
}

AlertDialogCtrl.$inject = ['$mdDialog', 'template', 'continueResp'];

export default AlertDialogCtrl;