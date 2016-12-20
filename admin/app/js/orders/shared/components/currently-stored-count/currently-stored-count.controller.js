import _ from 'lodash';
class CurrentlyStoredCountController {
    constructor() {
    }

    hasPreviouslyStoredItems() {
        return this.currentlyStoredInventory.length > 0;
    }
}
CurrentlyStoredCountController.$inject = [];
export default CurrentlyStoredCountController;
