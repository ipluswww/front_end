import API from './api.service.js';
class ContainerSubTypes extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
        this._AppConstants = AppConstants;
	}

	toString() {
		return 'containerSubTypes';
	}

    getGenericSubTypes() {
        // Controller Variable definition
        let query  = {
            sort: "name",
            limit:100,
            skip: 0,
            limit: 0,
            search: null
        };
        let types = [
            {"_id": this._AppConstants.genericSubTypes.boxed._id},
            {"_id": this._AppConstants.genericSubTypes.unboxed._id},
            {"_id": this._AppConstants.genericSubTypes.furniture._id}
        ];

        let filter = {"$or": types};
        return this.list(query, filter);
    }

    getRoomScalePropertyBasedOnContainerType(subType) {
        if (subType._id ===this._AppConstants.genericSubTypes.boxed._id) {
            return this._AppConstants.genericSubTypes.boxed.roomScalePropertyName;
        }
        else if (subType._id ===this._AppConstants.genericSubTypes.unboxed._id) {
            return this._AppConstants.genericSubTypes.unboxed.roomScalePropertyName;
        }
        else if (subType._id ===this._AppConstants.genericSubTypes.furniture._id) {
            return this._AppConstants.genericSubTypes.furniture.roomScalePropertyName;
        }
    }

}

ContainerSubTypes.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default ContainerSubTypes;
