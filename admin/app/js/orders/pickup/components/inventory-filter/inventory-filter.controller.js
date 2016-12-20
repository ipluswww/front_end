import _ from 'lodash';
class InventoryFilterController {
    constructor(Order, User, ContainerSubTypes, Pricing) {
        this._Order = Order;
        this._User = User;
        this._ContainerSubTypes = ContainerSubTypes;
        this._Pricing = Pricing;

        // prepare default count list
        this.init();
    }

    init() {
        // Invnetory type: boxed, unboxed and furniture
        this.inventoryTypes = [
            {
                name:'box',
                iconClass: 'drafts',
                active: true
            },
            {
                name:'unboxed',
                iconClass: 'motorcycle',
                active: true
            },
            {
                name:'furniture',
                iconClass: 'weekend',
                active: true
            }
        ];

        // Controller Variable definition
		this.query  = {
			sort: "name",
			limit: 0,
			page: 1,
			skip: 0,
			search: null
		};

        this.selected = null;

        // Get the data from server
        this.getData();
    }

    // Get data from the server based on filter connection
    getData() {
        if(this.isLocked) return;

        // generate filter object based on icon select/deselect
        let types = _.map(_.filter(this.inventoryTypes, {active: true}), (atom) => {
            return {"containerType.name": atom.name};
        });

        if (types.length < 1) {
            // no filter selected means no data.
            this.data = null;
            return;
        }
        let filter = {"$or": types};
        filter.active =true;
        let self = this;
        this._ContainerSubTypes.list(this.query, filter).then((res) => {
            self.data = res.data;
        });
    }

    // UI event handler
    // inventoryType icon click event handler
    toggleActivation(inventoryType) {
        if(this.isLocked) return;

        inventoryType.active = !inventoryType.active;
        this.getData();
    }

    // select item in the list
    selectItem(item) {
        if(this.isLocked) return;

        this.selected = item;
    }

    // item double click handler
    // add inventory item for inventoryContainer list
    addItem(subType) {
        if(this.isLocked) return;

        let item = {
            // inventoryIndex: inventoryIndex + 1,
            subType: subType,
            contents: '',
            label:''
        };

        // update itemPrice detail
        this.onDataUpdated({$event:{item: item}});

        // // always better idea to sort by type
        // this.order.inventory = _.sortBy(this.order.inventory, (atom) => {
        //     return _.findIndex(this.inventoryTypes, (itemType) => {
        //         return (itemType.name === atom.name);
        //     });
        // });
    }
}
InventoryFilterController.$inject = ['Order', 'User',
    'ContainerSubTypes', 'Pricing'];
export default InventoryFilterController;
