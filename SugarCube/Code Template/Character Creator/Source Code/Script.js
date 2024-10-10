// ~ ~ ~ SLIDER TO VARIABLE ~ ~ ~
/* The code below was taken from HiEv's Sample Code:
    https://hiev-heavy-ind.com/Sample_Code/Sample_Code.html

    It will try to find any <input> code on the page that wants to save the value into a variable.
        <input type="range" min="0" max="100" value="50"
			data-var="$VAR" oninput="SugarCubeInput(this)">
    
    type="range"    -> makes the slider
    min="0"         -> the min value
    max="100"       -> the max value
    value="50"      -> the base value
    data-var="$VAR" -> the variable to save the value
                       $variable, _temporary, $object.var...
    oninput="SugarCubeInput(this)"
                    -> the function to make it all work (below)		
*/

window.SugarCubeInput = function (element) {
	var varname = $(element).data("var");
	if ((varname.indexOf("$") === 0) || (varname.indexOf(".") === 0)) {
		State.setVar(varname, $(element).val());
	}
};

$(document).on(":passagerender", function (event) {
	$(event.content).find("input").each(function () {
		var varname = $(this).data("var");
		if (varname !== undefined) {
			if ((varname.indexOf("$") === 0) || (varname.indexOf(".") === 0)) {
				State.setVar(varname, $(this).val());
			}
		}
	});
});
