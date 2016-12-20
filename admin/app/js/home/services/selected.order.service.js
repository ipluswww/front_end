import _ from 'lodash';
class SelectedOrderService {
    get () {
        return this.selectedItem;
    }
    set (selectedItem) {
        this.selectedItem = _.cloneDeep(selectedItem);
    }

}

export default SelectedOrderService;
