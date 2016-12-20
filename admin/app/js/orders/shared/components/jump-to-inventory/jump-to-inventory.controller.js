import _ from 'lodash';
class JumpToInventoryController {
    constructor() {
        // scope variable, temporary holder for previous jumpTo filter
        this.oldJumpTo = "";
    }

    onJumpTo() {
        let jumpToFilter = this.filter.jumpTo.toLowerCase();
        if (this.oldJumpTo !== jumpToFilter) this.filter.jumpToTarget = null;
        this.oldJumpTo = jumpToFilter;
        let containers = _.filter(this.inventory, (atom) => {
            let label = (atom.label || "").toLowerCase();
            let contents = (atom.contents || "").toLowerCase();

            return ((label.indexOf(jumpToFilter) >= 0) ||
                (contents.indexOf(jumpToFilter) >= 0))
        });

        if(this.filter.jumpToTarget) {
            // if we had existing, move to next
            let index = _.findIndex(containers, (atom) => {
                return (atom._id === this.filter.jumpToTarget);
            });
            this.filter.jumpToTarget = (index === containers.length - 1) ? containers[0]._id : containers[index + 1]._id;
        } else {
            this.filter.jumpToTarget = (containers.length > 0) ? containers[0]._id : null;
        }

        console.log(this.filter.jumpToTarget);

    }
};

JumpToInventoryController.$inject = [];
export default JumpToInventoryController;
