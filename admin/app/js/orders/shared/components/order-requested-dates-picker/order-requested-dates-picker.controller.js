import _ from 'lodash';
import moment from 'moment';
class OrderRequestedDatesPickerController {
	constructor() {
		this.init();
	}

	init () {
		this.dates = [];
		for (let i = 1; i <= 3; i++) {
			const key = "requestedDate" + i;
			if (this.order[key]) {
				this.add(new Date(this.order[key]));
			}
		}
	}

	addNew() {
		this.add(new Date());
		this.select();
	}

	add(date) {
		const hh = date.getHours() < 12 ? 0 : 12;
		this.dates.push({date, hh});
	}

	remove(index) {
		this.dates.splice(index, 1);
		this.select();
	}

	select() {
		this.order.requestedDate1 = null;
		this.order.requestedDate2 = null;
		this.order.requestedDate3 = null;

		this.dates.forEach((d, index) => {
			const key = `requestedDate${index+1}`;
			const m = moment.utc();
			m.set('year', d.date.getFullYear()).set('month', d.date.getMonth()).set('date', d.date.getDate());
			m.set('hour', d.hh).set('minute', 0).set('second', 0).set('millisecond', 0);
			this.order[key] = m.toISOString();
		});
	}
}

OrderRequestedDatesPickerController.inject = [];

export default OrderRequestedDatesPickerController;
