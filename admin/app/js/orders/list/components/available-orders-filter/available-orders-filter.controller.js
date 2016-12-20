import _ from 'lodash';
class AvailableOrdersFilterController {
    constructor() {
        this.init();
    }

    init() {
        this.filterExpanded = false;
        this.options = ['pending', 'in_progress', 'completed', 'other'];
        this.options = [
            {
                value: "pending",
                text: "Pending"
            },
            {
                value: "in_progress",
                text: "In progress"
            },
            {
                value: "completed",
                text: "Completed"
            },
            {
                value: "other",
                text: "Other"
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
        if (this.list.length === 0) {
            this.list = _.clone(this.options);
        }
        if (this.list.length === this.options.length) {
            while(this.list.length) {
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

export default AvailableOrdersFilterController;
