import _ from 'lodash';
class SelectedProspectService {
    get () {
        return this.selectedItem;
    }
    set (selectedItem) {
        this.selectedItem = _.cloneDeep(selectedItem);
    }

}

export default SelectedProspectService;
