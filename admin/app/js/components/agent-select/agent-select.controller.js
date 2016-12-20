import _ from 'lodash';
class AgentSelectController {
	constructor(Agent, $window, $scope) {
		this._Agent = Agent;
		this._agentId = _.cloneDeep(this.ngInputAgentId);
		this.init();
	}


	init () {
		this.simulateQuery = false;
		this.isDisabled    = true;
		this.agents = [];

		const query = {limit: 0, page: 0};
		this._Agent.list(query).then(res => {
			this.agents = _.map(res.data, agent => {
				return {
					_id: agent._id,
					name: agent.name
				};
			});
			this.selectedItem = _.find(this.agents, {_id: this._agentId});
			this.isDisabled = false;
		});
	}

	querySearch (query) {
		const q = angular.lowercase(query);
		const results = query ? this.agents.filter(agent => angular.lowercase(agent.name).indexOf(q) >= 0) : this.agents;
		return results;
	}

	selectedItemChange(item) {
		if (item) {
			this.onSelect({agentId: item._id});
		}
	}
}

AgentSelectController.inject = ['Agent', '$window', '$scope'];

export default AgentSelectController;
