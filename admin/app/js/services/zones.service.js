class ZonesService {
    get () {
        var zones = [
	        {id: 1, hour: -5, name: "Eastern Standard Time"}, //  / Central Daylight Time
	        {id: 2, hour: -7, name: "Mountain Standard Time"},
	        {id: 3, hour: -6, name: "Central Standard Time"},
	        {id: 4, hour: -8, name: "Pacific Standard Time"},
	        {id: 5, hour: -4, name: "Atlantic Standard Time"} //  / Eastern Daylight Time
	        /*
	        {id: 6, hour: -3, name: "Atlantic Daylight Time"},
	        {id: 7, hour: -2.5, name: "Newfoundland Daylight Time"},
	        {id: 8, hour: -3.5, name: "Newfoundland Standard Time"},*/
        ];
        return zones;
    }

}

export default ZonesService;