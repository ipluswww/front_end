import _ from 'lodash';
import moment from 'moment';

const CONST_AM = 'AM';
const CONST_PM = 'PM';
const CONST_BASEREQUESTEDDATEFIELD = 'requestedDate';
const CONST_REQUESTEDDATEFIELD1 = 'requestedDate1';
const CONST_REQUESTEDDATEFIELD2 = 'requestedDate2';
const CONST_REQUESTEDDATEFIELD3 = 'requestedDate3';


export default class RequestedPickupController {
    constructor($scope, OrdersValidationService) {
        this.minDates = 1;
        this.maxDates = 3;
        this._$scope = $scope;
        this._OrdersValidationService = OrdersValidationService;
        this.init();
    }

    init() {
        this.dates = this.getDatesFromOrder();
        this.setupDateValidation();
    }

    setupDateValidation() {
        let self = this;
        let unbindDateWatch = this._$scope.$watch('requestedPickup.dates', (dates) => {
            if(angular.isDefined(dates) && dates !==null){
                self.synchronizeDateArrayWithFields();
                self.form.$setValidity('futureDates', self._OrdersValidationService.hasAtLeastOneFutureRequestedPickupDate(this.order));
                self.form.$setValidity('uniqueDates', self._OrdersValidationService.hasUniqueRequestedDates(this.order));
            }
        }, true);

        this._$scope.$on('destroy', ()=>{
            unbindDateWatch();
        });
    }

    getDatesFromOrder() {
        let dateCollection = [];
        let dateFields = [
            CONST_REQUESTEDDATEFIELD1,
            CONST_REQUESTEDDATEFIELD2,
            CONST_REQUESTEDDATEFIELD3
        ];
        dateFields.forEach((dateField)=>{
            let date = this.getDateFromOrderDate(this.order, dateField);
            if(date !==null) {
                dateCollection.push(date);
            }
        });

        if(dateCollection.length ===0){
            dateCollection.push(this.getDefaultDate());
        }
        return dateCollection;
    }

    synchronizeDateArrayWithFields() {
        for(let i = 0;i<this.maxDates;i++) {
            let date = this.dates[i];
            let orderFieldNumber = i+1;
            let fieldName = CONST_BASEREQUESTEDDATEFIELD + orderFieldNumber;

            if(angular.isUndefined(date) || date ===null) {
                this.order[fieldName] =  null;
            }
            else {
                this.order[fieldName] =  this.getDateToSave(date);
            }
        }
    }

    getDateToSave(dateWithTimeframe){
        let date = new Date(dateWithTimeframe.date);
        let hour = dateWithTimeframe.timeframe === CONST_PM ? 12: 0;
        date.setHours(hour,0,0,0);
        return date;
    }

    getDateFromOrderDate(order, fieldName) {
        let date = order[fieldName];
        if(angular.isUndefined(date) || date === null){
            return null;
        }
        let dt = new Date(date);
        dt.setHours(0,0,0,0);
        let tf = dt.getHours() == 12 ? CONST_PM : CONST_AM;

        return {
            date: dt,
            timeframe: tf
        };
    }

    getDefaultDate() {
        let dt = new Date();
        dt.setHours(0,0,0,0);
        dt.setDate(dt.getDate() + 1);
        return { date: dt, timeframe: CONST_AM };
    }

    removeDate(index){
        if(this.canDeleteDate()) {
            this.dates.splice(index, 1);
        }
    }

    canAddDate() {
        return !this.isLocked && this.dates.length < this.maxDates;
    }

    canDeleteDate() {
        return !this.isLocked && this.dates.length > this.minDates;
    }

    showAbilityToAddDates(dateIndex){
        return this.canAddDate()
            && dateIndex === this.dates.length-1
            && this.dates[dateIndex] !== null;
    }

    addDate() {
        if(this.canAddDate()) {
            this.dates.push(this.getDefaultDate());
        }
    }

    // UI helper: display label based on pickup/delivery status
    getLabel() {
        return (this.order.goingToWarehouse === true) ? "Requested Pickup Date" :"Requested Delivery Date";
    }
}

RequestedPickupController.$inject =['$scope', 'OrdersValidationService'];
