let orderidifyFilter = function() {
	return function(string) {
        if (string) {
            return string.substring(0, string.length - 5) + "<span class='idify-highlight'>" + string.slice(-5) + "</span>";
        } else {
            return "";
        }
	};
};

export default orderidifyFilter;
