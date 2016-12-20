import _ from 'lodash';
class AvailableOrdersFilterController {
    constructor() {
        this.init();
    }

    init() {
        this.filterExpanded = false;
        this.options = ['reservation', 'partners', 'inquiries'];
        this.list = this.list || [];
    }

    toggle(option) {
        const index = this.list.indexOf(option);
        if (option === 'inquiries') {
            while(this.list.length) {
                this.list.splice(0, 1);
            }
        } else {
            const inq = this.list.indexOf('inquiries');
            if (inq >= 0) {
                this.list.splice(inq, 1);
            }

            if (index < 0) {
                this.list.push(option);
            } else {
                this.list.splice(index, 1);
            }
        }

        if (this.list.length === 0) {
            this.list.push(option);
        }
        this.select();
    }

    select() {
        this.filterExpanded = false;
        this.onSelect();
    }

    isExists(option) {
        return this.list.indexOf(option) >= 0;
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
