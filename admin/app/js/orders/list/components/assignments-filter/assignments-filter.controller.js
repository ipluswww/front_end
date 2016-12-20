import _ from 'lodash';
class AssignmentsFilterController {
    constructor() {
        this.init();
    }

    init() {
        this.filterExpanded = false;
        this.options = [
            {
                value: "me",
                text: "Assigned To Me"
            },
            {
                value: "unassigned",
                text: "Unassigned"
            }
        ];
        
        this.list = this.list || [];
    }

    toggle(option) {
        const index = this.list.indexOf(option.value);
        if (index < 0) {
            this.list.push(option.value);
        } else {
            this.list.splice(index, 1);
        }
        if (this.list.length === this.options.length) {
            while (this.list.length) {
                this.list.pop();
            }
        }
        this.select();
    }

    select() {
        this.filterExpanded = false;
        this.onSelect();
    }

    isExists(option) {
        return this.list.indexOf(option.value) >= 0;
    }

    toggleFilterPanel() {
        this.filterExpanded = !this.filterExpanded;
    }

    getStatus() {
        if (this.list.length === 0) {
            return ['All'];
        } else {
            return this.list;
        }
    }
};

export default AssignmentsFilterController;
