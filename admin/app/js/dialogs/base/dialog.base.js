class BaseDialog {

    constructor($mdDialog, getDefaultOptions) {
        this.mdDialog = $mdDialog;
        this.options = getDefaultOptions();
        this.getDefaultOptions = getDefaultOptions;
    }

    show() {
        return this.mdDialog
            .show(this.options)
            .finally(() => this.resetOptions());
    };

    resetOptions() {
        this.options = this.getDefaultOptions();
    };

    hide(value) {
        this.resetOptions();
        return this.mdDialog
            .hide(value);
    };

    cancel(value) {
        this.resetOptions();
        return this.mdDialog.cancel(value);
    };

    withTargetEvent(event) {
        this.options.targetEvent = event;
        return this;
    };
}

export default BaseDialog;