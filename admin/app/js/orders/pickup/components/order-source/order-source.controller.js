import _ from 'lodash';
class OrderSourceController {
    constructor(OrderSource) {
        this._OrderSource = OrderSource;
        this.init();
    }

    init() {
        const self = this;
        const query = {
            limit: 0,
            page: 1
        };
        this._OrderSource.list(query)
            .then(res => {
                self.sourceList = _.map(res.data, orderSource => orderSource.name);
            });
    }
}
OrderSourceController.$inject = ['OrderSource'];
export default OrderSourceController;
