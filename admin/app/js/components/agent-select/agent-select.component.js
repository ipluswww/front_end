import controller from './agent-select.controller';

let AgentSelect = {
	controller: controller,
	templateUrl: 'templates/components/agent-select.component.html',
	bindings: {
		ngInputAgentId: '<',
		onSelect: '&'
	}
};

export default AgentSelect;
