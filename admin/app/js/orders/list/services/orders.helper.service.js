import _ from 'lodash';
class OrdersHelperService {
    constructor(AppConstants, User) {
        this._Dispositions = AppConstants.dispositions;
        this._User = User;
    }

    generateFilter(params) {
        const D = this._Dispositions;
        const filter = {};
        if (params.markets) {
            filter["market._id"] = {
                "$in": _.map(params.markets, market => market._id)
            };
        } else {
            filter["market._id"] = {
                "$ne": null
            };
        }

        if (params.dispositions && params.dispositions.length) {
            filter.disposition = {
                "$in": _.map(params.dispositions, disposition => disposition.text)
            };
        }
        if (params.availableOrders && params.availableOrders.length) {
            const orCases = [];
            params.availableOrders.forEach(v => {
                if (v ===  "pending") {
                    orCases.push({
                        "$or": [
                            {
                                "disposition": {
                                    "$in": [D.requested, D.created]
                                }
                            },
                            {
                                "disposition": D.updated,
                                "acceptedDate": null
                            }
                        ]
                    });
                }
                if (v ===  "in_progress") {
                    orCases.push({
                        "$or": [
                            {
                                "disposition": {
                                    "$in": [D.accepted, D.scheduled, D.inTransit]
                                }
                            },
                            {
                                "disposition": D.updated,
                                "acceptedDate": {
                                    "$ne": null
                                }
                            }
                        ]
                    });
                }
                if (v ===  "completed") {
                    orCases.push({
                        "disposition": {
                            "$in": [D.completed, D.reconciled]
                        }
                    });
                }
                if (v ===  "other") {
                    orCases.push({
                        "disposition": {
                            "$in": [D.cancelled, D.paymentHold]
                        }
                    });
                }
            });

            filter["$or"] = orCases;
        }
        if (params.assignments && params.assignments.length) {
            params.assignments.forEach(v => {
                if (v === "me") {
                    filter["assigned._id"] = this._User.current._id;
                }
                if (v === "unassigned") {
                    filter.assigned = null;
                }
            });
        }
        return filter;
    }
}

OrdersHelperService.$inject = ['AppConstants', 'User'];

export default OrdersHelperService;
