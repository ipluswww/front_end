import AppConstants from '../../config/app.constants.js';
import Location from './location.js';
export default class BaseOrder {
 constructor() {
  this.customer = {};
  this.originationLocation = new Location();
  this.terminalLocation = new Location();
  this.roomEstimators = {
   items: {},
   total: 0,
   points: 0
  };
  this.spacePriceSelection = {
   selectedData: null, // currently selected spacePrice data
   items: [], // list data
   price: 0
  };
  this.itemPriceSelection = {
   box: 0,
   boxed: 0,
   unboxed: 0,
   furniture: 0,
   total: 0,
   itemCap: 0,
   pointsTotal: 0,
   price: 0
  }
  this.spacePrice = false;
  this.options = [];
  this.tasks = {};
  this.inventory = [];
  this.storageUnit = null;
  this.market = {};
  this.disposition = AppConstants.prospect;
  this.allowableDispositions = [AppConstants.dispositions.requested,
   AppConstants.dispositions.created, AppConstants.dispositions.cancelled
  ]
  this.source = 'Internal';
  this.createdByAdmin = true;
 }
}