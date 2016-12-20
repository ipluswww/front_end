import _ from 'lodash';

class  LogisticsController {

	constructor ($scope, $q, Market, Agent, Customer, Order, GoogleApi, GoogleMapApi){
		this._$scope = $scope;
		this._$q = $q;
		this._Market = Market;
		this._Agent = Agent;
		this._Customer = Customer;
		this._Order = Order;
		this._GoogleApi = GoogleApi;
		this._GoogleMapApi = GoogleMapApi;
		window._$ctrl = this;
		this.init();
	}

	init () {
		// Controller Variable definition
		const self = this;
		// Search query to get entries from API
		this.query  = {
			sort: "",
			limit: 0,
			page: 1,
			skip: 0,
			search: null
		};

		this.selectedDate = new Date();

		this.options = [
			{
				key: "market",
				label: "Markets",
				class: "markets-option",
				selected: true
			},
			{
				key: "agent",
				label: "Agents",
				class: "agents-option"
			},
			{
				key: "customer",
				label: "Customers",
				class: "customers-option"
			},
			{
				key: "pickup",
				label: "Pickups",
				class: "pickups-option"
			},
			{
				key: "delivery",
				label: "Deliveries",
				class: "deliveries-option"
			},
			{
				key: "other",
				label: "Other",
				class: "other-option"
			}
		];

		this.loading = true;

		this._GoogleMapApi.then(function(maps) {
			self._maps = maps;
			// Map params, including events
			self.map  = { 
				control: {},
				center: { 
					latitude: 38.4653304, 
					longitude: -97.7304297 
				}, 
				zoom: 7,
				options: {
					minZoom: 3
				},
				bounds: {
					// max bounds for map
					max: {
						west: -118.0,
						east: -76.0,
						south: 31.5,
						north: 45.5
					}
				},
				window: {
					marker: {},
					show: false,
					closeClick: function() {
						this.show = false;
					},
					options: {
						pixelOffset: {height: -25, width: 0}
					}
				},
				markers: [],
				onClickMarker: (marker, event, model, args) => {
					// Marker CLICK Event
					self.map.window.model = model;
					self.map.window.show = "modal";

					if (model.values.type === "pickup" || model.values.type === "delivery") {
						// Draw Route for ORDER
						const colors = {
							pickup: {
								CREATED: 	"#90EE90",
								REQUESTED: 	"#90EE90",
								ACCEPTED: 	"#8FBC8F",
								SCHEDULED: 	"#3CB371",
								IN_TRANSIT: "#2E8B57",
								COMPLETED: 	"#2E8B57"
							},
							delivery: {
								CREATED: 	"#87CEEB",
								REQUESTED: 	"#87CEEB",
								ACCEPTED: 	"#00BFFF",
								SCHEDULED: 	"#1E90FF",
								IN_TRANSIT: "#4682B4",
								COMPLETED: 	"#4682B4"
							}
						};

						if (!self._directionDisplay) {
							self._directionDisplay = new self._maps.DirectionsRenderer();
						}

						self.getGoogleDirections(model.values.origin.coords, model.values.destination.coords).then(path => {
							if (path) {
								self._directionDisplay.setMap(self.map.control.getGMap());
								self._directionDisplay.setOptions({
									polylineOptions: {
										strokeColor: colors[model.values.type][model.values.disposition]
									}
								});
								self._directionDisplay.setDirections(path);
							}
						});
					} else {
						if (self._directionDisplay) {
							self._directionDisplay.setMap(null);
						}
					}
				},
				events: {
					// Define Marker Events
					mouseover: function(marker, event, model, args) {
						// Show info window
						if (!self.map.window.show) {
							self.map.window.model = model;
							self.map.window.show = "info";
						}
						return false;
					},
					mouseout: function(marker, event, model, args) {
						// Hide info window
						if (self.map.window.show === "info") {
							self.map.window.show = false;
						}
						return false;
					}
				}
			};

			self.loading = false;

			self.getData(self.query);
		});
	}

	setMarkers(markers) {
		const self = this;
		this.map.markers = [];
		const bounds = {};

		markers.forEach(marker => {
			// Remove invalid marker
			if (marker.coords.latitude < -90 || marker.coords.latitude > 90) return;
			if (marker.coords.longitude < -180 || marker.coords.longitude > 180) return;
			// Get bounds for map
			if (!bounds.west || marker.coords.longitude < bounds.west) bounds.west = marker.coords.longitude;
			if (!bounds.east || marker.coords.longitude > bounds.east) bounds.east = marker.coords.longitude;
			if (!bounds.south || marker.coords.latitude < bounds.south) bounds.south = marker.coords.latitude;
			if (!bounds.north || marker.coords.latitude > bounds.north) bounds.north = marker.coords.latitude;
			this.map.markers.push(marker);
		});

		// Focus bounds on US
		if (!bounds.west || this.map.bounds.max.west > bounds.west) bounds.west = this.map.bounds.max.west;
		if (!bounds.east || this.map.bounds.max.east < bounds.east) bounds.east = this.map.bounds.max.east;
		if (!bounds.south || this.map.bounds.max.south > bounds.south) bounds.south = this.map.bounds.max.south;
		if (!bounds.north || this.map.bounds.max.north < bounds.north) bounds.north = this.map.bounds.max.north;
		// Set bounds
		this.map.bounds.current = bounds;
		this.map.control.getGMap().fitBounds(this.map.bounds.current);		

		if (this._$scope.$root.$$phase != '$apply' && this._$scope.$root.$$phase != '$digest') {
			this._$scope.$apply(function () {
				self._$scope.mapInstance = self.map.control.getGMap();
			});
		}
	}

	// call back function after pagination and column order
	getData(query) {
		// Check options and loads markers
		const promises = [];
		this.options.forEach(option => {
			if (option.selected) {
				if (option.key === "market") {
					promises.push(this.getMarkets(query));
				} else if (option.key === "agent") {
					promises.push(this.getAgents(query));
				} else if (option.key === "customer") {
					promises.push(this.getCustomers(query));
				} else if (option.key === "pickup") {
					promises.push(this.getPickups(query));
				} else if (option.key === "delivery") {
					promises.push(this.getDeliveries(query));
				}
			}
		});
		
		this.loading = promises.length !== 0;
		Promise.all(promises).then(args => {
			const markers = [];
			args.forEach(list => {
				list.forEach(marker => {
					markers.push(marker);
				});
			});
			// Set markers
			this.setMarkers(markers);

			this.loading = false;
		});
	}

	getMarkets(query) {
		// Get Markets based on query
		let markets = [];

		return this._Market.list(query).then( (res) => {
			const promises = [];
			res.data.forEach(market => {
				const zip = market.serviceablePostalCodes[0];
				if (zip) {
					markets.push({
						id: "market_" + market._id,
						icon: 'assets/market_marker.png',
						values: {
							id: market.id,
							type: 'market',
							name: market.name,
							subMarketNames: market.subMarketNames.join(", "),
							shortName: market.shortName,
							title: market.title,
							url: market.url,
							description: market.description,
							active: market.active ? "Yes" : "No",
							comingSoon: market.comingSoon ? "Yes" : "No",
							autoEmailAgent: market.autoEmailAgent ? "Yes" : "No",
							timeZoneHour: market.timeZoneHour,
							insuranceFactor: market.insuranceFactor,
							zip: zip
						}
					});
					promises.push(this._GoogleApi.getGeocode(zip));
				}
			});
			return Promise.all(promises);			
		}).then(args => {
			markets = _.map(markets, (market, index) => {
				market.coords = args[index];
				return market;
			});
			return Promise.resolve(markets);
		});
	}

	getAgents(query) {
		// Get Agents and its warehouses based on query
		const agents = [];
		return this._Agent.list(query).then( (res) => {
			res.data.forEach(agent => {
				agent.warehouseLocations.forEach(warehouse => {
					if (warehouse.location && warehouse.location.coordinate) {
						agents.push({
							id: "agent_" + warehouse._id,
							icon: 'assets/agent_marker.png',
							coords: {
								latitude: warehouse.location.coordinate.lat,
								longitude: warehouse.location.coordinate.lng
							},
							values: {
								type: 'agent',
								id: agent._id,
								name: agent.name,
								address: warehouse.location.address,
								phone: agent.phone,
								email: agent.email,
								location: warehouse.location
							}
						});
					}
				});
			});
			return Promise.resolve(agents);
		});
	}

	getCustomers(query) {
		// Get Customer based on query
		const customers = [];
		const icons = {
			Active: 	"assets/customer1_marker.png",
			Prospect: 	"assets/customer2_marker.png",
			Inactive: 	"assets/customer3_marker.png"
		};
		return this._Customer.list(query).then( (res) => {
			res.data.forEach(customer => {
				customers.push({
					id: "customer_" + customer._id,
					icon: icons[customer.status],
					coords: {
						latitude: customer.location.coordinate.lat,
						longitude: customer.location.coordinate.lng
					},
					values: {
						type: "customer",
						id: customer._id,
						name: customer.name,
						phone: customer.mobile,
						email: customer.email,
						location: customer.location,
						status: customer.status
					}
				});
			});
			return Promise.resolve(customers);
		});
	}

	getPickups(query) {
		// Get Pickup Orders based on query
		const q = _.clone(query);
		q.query = {
			disposition: {
				"$in": [ "CREATED", "REQUESTED", "ACCEPTED", "SCHEDULED", "IN_TRANSIT", "COMPLETED" ]
			},
			goingToWarehouse: true
		};
		let orders = [];
		const icons = {
			CREATED: 	"assets/pickup1-marker.png",
			REQUESTED: 	"assets/pickup1-marker.png",
			ACCEPTED: 	"assets/pickup2-marker.png",
			SCHEDULED: 	"assets/pickup3-marker.png",
			IN_TRANSIT: "assets/pickup4-marker.png",
			COMPLETED: 	"assets/pickup4-marker.png"
		};
		return this._Order.filter(q).then( (res) => {
			const promises = [];
			res.data.forEach(order => {
				if (order.originationLocation && order.originationLocation.coordinate
						&& order.terminalLocation && order.terminalLocation.coordinate) {

					const origin = {
						latitude: order.originationLocation.coordinate.lat,
						longitude: order.originationLocation.coordinate.lng
					};
					const destination = {
						latitude: order.terminalLocation.coordinate.lat,
						longitude: order.terminalLocation.coordinate.lng
					};

					orders.push({
						id: "order_" + order._id,
						icon: icons[order.disposition],
						coords: origin,
						values: {
							type: "pickup",
							id: order._id,
							disposition: order.disposition,
							origin: {
								address: order.originationLocation.address,
								coords: origin
							},
							destination: {
								address: order.terminalLocation.address,
								coords: destination
							},
							customer: {
								name: order.customer.name,
								phone: order.customer.mobile,
								email: order.customer.email,
								location: order.customer.location
							}
						}
					});
				}
			});
			return Promise.resolve(orders);
		});
	}

	getDeliveries(query) {
		// Get Delivery Orders based on query
		const q = _.clone(query);
		q.query = {
			disposition: {
				"$in": [ "CREATED", "REQUESTED", "ACCEPTED", "SCHEDULED", "IN_TRANSIT", "COMPLETED" ]
			},
			goingToWarehouse: false
		};
		const orders = [];
		const icons = {
			CREATED: 	"assets/delivery1-marker.png",
			REQUESTED: 	"assets/delivery1-marker.png",
			ACCEPTED: 	"assets/delivery2-marker.png",
			SCHEDULED: 	"assets/delivery3-marker.png",
			IN_TRANSIT: "assets/delivery4-marker.png",
			COMPLETED: 	"assets/delivery4-marker.png"
		};

		return this._Order.filter(q).then( (res) => {
			const promises = [];
			res.data.forEach(order => {
				if (order.originationLocation && order.originationLocation.coordinate
						&& order.terminalLocation && order.terminalLocation.coordinate) {

					const origin = {
						latitude: order.originationLocation.coordinate.lat,
						longitude: order.originationLocation.coordinate.lng
					};
					const destination = {
						latitude: order.terminalLocation.coordinate.lat,
						longitude: order.terminalLocation.coordinate.lng
					};

					orders.push({
						id: "order_" + order._id,
						icon: icons[order.disposition],
						coords: origin,
						values: {
							type: "delivery",
							id: order._id,
							disposition: order.disposition,
							origin: {
								address: order.originationLocation.address,
								coords: origin
							},
							destination: {
								address: order.terminalLocation.address,
								coords: destination
							},
							customer: {
								name: order.customer.name,
								phone: order.customer.mobile,
								email: order.customer.email,
								location: order.customer.location
							}
						}
					});
				}
			});
			return Promise.resolve(orders);
		});
	}

	getGoogleDirections(origin, destination)  {
		// Get the route on from Google Directions Service based on origin and destination latitude and longitude
		const request = {
			origin: origin.latitude + "," + origin.longitude,
			destination: destination.latitude + "," + destination.longitude,
			travelMode: "DRIVING"
		};
		return new Promise( (resolve, reject) => {
			return new this._maps.DirectionsService().route(request, function(response, status) {
				if (status == 'OK' && response.routes.length > 0) {
					return resolve(response);
				}
				return resolve(false);
			});
		});
	}

	onSearch() {
		this.getData(this.query);
		this.map.window.show = false;
	}

	onOptionChange(option) {
		let markers = [];
		
		if (option.selected) {
			// Add new markers only
			const promises = [];
			if (option.key === "market") {
				promises.push(this.getMarkets(this.query));
			} else if (option.key === "agent" ) {
				promises.push(this.getAgents(this.query));
			} else if (option.key === "customer" ) {
				promises.push(this.getCustomers(this.query));
			} else if (option.key === "pickup" ) {
				promises.push(this.getPickups(this.query));
			} else if (option.key === "delivery" ) {
				promises.push(this.getDeliveries(this.query));
			}
			
			if (promises.length > 0) {
				this.loading = true;
				Promise.all(promises).then(args => {
					markers = _.concat(this.map.markers, args[0]);
					this.setMarkers(markers);
					this.loading = false;
				});
			}
		} else {
			// Remove unnecessary markers
			markers = this.map.markers.filter(marker => marker.values.type !== option.key);
			this.setMarkers(markers);
		}
		this.map.window.show = false;
	}

}

LogisticsController.$inject = ['$scope', '$q', 'Market', 'Agent', 'Customer', 'Order', 'GoogleApi', 'uiGmapGoogleMapApi'];
export default LogisticsController;
