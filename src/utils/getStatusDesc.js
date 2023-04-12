// MAINTENANCE_STATUS_NONE = 0
// MAINTENANCE_STATUS_CREATED = 1
// MAINTENANCE_STATUS_PROGRESS = 2
// MAINTENANCE_STATUS_DONE = 3
// MAINTENANCE_STATUS_REMOVED = 4
const getMaintenanceStatusDesc = (status) => {
	let desc = '';

	switch (parseInt(status)) {
		case 0:		desc = 'None';					break;
		case 1:		desc = 'Created';				break;
		case 2:		desc = 'Progress';			break;
		case 3:		desc = 'Done';					break;
		case 4:		desc = 'Removed';				break;
		default:	desc = 'None';					break;
	}

	return desc;
}

// EXECUTION_SCOPE_NONE = 0
// EXECUTION_SCOPE_GLOBAL = 1
// EXECUTION_SCOPE_SERVICE = 2
// EXECUTION_SCOPE_INSTANCE = 3
// EXECUTION_SCOPE_OTHER = 4
const getExecutionScopeDesc = (status) => {
	let desc = '';

	switch (parseInt(status)) {
		case 0:		desc = 'None';					break;
		case 1:		desc = 'Global';				break;
		case 2:		desc = 'Service';				break;
		case 3:		desc = 'Instance';			break;
		case 4:		desc = 'Other';					break;
		default:	desc = 'None';					break;
	}

	return desc;
}

export { 
	getMaintenanceStatusDesc,
	getExecutionScopeDesc,
};
