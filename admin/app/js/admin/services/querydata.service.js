class QueryDataService {
	constructor() {
		this.data = {};
	}

	getQuery(type) {
		return this.data[type];
	}

    setQuery(type, query) {
        this.data[type] = query;
    }

}

export default QueryDataService;
