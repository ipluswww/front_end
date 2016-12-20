class  CallProspectController {

    constructor (Order, User, $mdDialog, AlertService){
       this._Order = Order;
       this._User = User;
       this._$mdDialog = $mdDialog;
       this._AlertService = AlertService;
    }

    onCallAction() {
        let self = this;

        if (this.order.called) {
            this.unsetCall();
        } else {
            this.setCall();
        }

    }

    setCall() {
        let self = this;

        let object = {
            called: new Date(),
            calledUser: this._User.current.username,
            _id: self.order._id
        };

        self._Order.update(object).then((res) => {
            self.order.called = res.called;
            self.order.calledUser = res.calledUser;
            self.order.events = res.events;
            self._AlertService.success("The record has been successfully update with the call information.");
        });
    }

    unsetCall() {
        let self = this;

        var confirm = this._$mdDialog.confirm()
            .textContent('Are you sure you want to disable the called flag?')
            .ok('Yes')
            .cancel('No');
        this._$mdDialog.show(confirm).then(function() {
            let object = {
                called: null,
                calledUser: null,
                _id: self.order._id
            };
            self._Order.update(object).then((res) => {
                self.order.called = res.called;
                self.order.calledUser = res.calledUser;
                self.order.events = res.events;
                self._AlertService.success("The record has been unset the call information.");
            });
        }, function() {
        });
    }

}

CallProspectController.$inject = ['Order', 'User', '$mdDialog', 'AlertService'];

export default CallProspectController;
