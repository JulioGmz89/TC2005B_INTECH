

module.exports = function convertTaskStatus(strStatus){
	if (strStatus == 'TO DO'){ return 0; }
	else if (strStatus == 'ON HOLD') { return .25; }
	else if (strStatus == 'WORKING ON IT') { return .5; }
	else if (strStatus == 'WAITING FOR REVIEW') { return .75; }
	else if (strStatus == 'DONE') { return 1; }
	return 0;
}