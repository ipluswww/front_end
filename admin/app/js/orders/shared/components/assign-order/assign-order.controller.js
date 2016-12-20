class AssignOrderController {
    constructor(User, Order, Visitor, AlertService) {
        this._User = User;
        this._Order = Order;
        this._Visitor = Visitor;
        this._AlertService = AlertService;

        if (this.order) {
            this.object = this.order;
        } else {
            this.object = this.visitor;
        }
    }

    isAssigned() {
        return this.object.assigned;
    }

    assignToMe() {
        let _Service = null;
        let updateObj = {
            _id: this.object._id,
            assigned: this._User.current._id
        };
        
        if (this.order) {
            _Service = this._Order;
        } else if (this.visitor) {
            _Service = this._Visitor;
        }

        _Service.update(updateObj).then(res => {
            this.object.assigned = this._User.current;
            this._AlertService.success("The records have been successfully updated with assigned information.");
        }).catch(err => {
            this._AlertService.error(err.data.message);
        });
    }
}

AssignOrderController.$inject = ['User', 'Order', 'Visitor', 'AlertService'];

export default AssignOrderController;
