//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS~ ~ ~ ~
    //~ ~ Passage Cleanup ~ ~
        // ~ Reset Passage to top
        // ~ Reset Dialog Box to top
    //~ ~ SETTINGS~ ~
        // ~ Font Size
        // ~ Font Type
        // ~ Autosave
        // ~ Naming Saves

//~ ~ ~ ~ Passage Cleanup ~ ~ ~ ~
    // ~ Passage
$(document).on(":passagedisplay", function() {
	$("#passages").scrollTop(0);
});
    // ~ Dialog box
$(document).on(':dialogopened', function (ev) {
	$("#ui-dialog-body").scrollTop(0);
});

//~ ~ ~ ~ SETTINGS OPTIONS ~ ~ ~ ~
    /*
        For more Setting Options, see my Setting Template: https://manonamora.itch.io/twine-sugarcube-templates
    */

    //~ ~ ~ ~ TEXT DYSPLAY ~ ~ ~ ~
Setting.addHeader("Text Display");
        
        //~ ~ Font Type ~ ~
var settingFontFamily = ["Serif", "Sans Serif", "OpenDyslexic"];
var fontFamily = function() {
var $html = $("html"); 
    $html.removeClass("serif sansserif opendyslexic");
switch (settings.fontFamily) {
    case "Serif":
        $html.addClass("serif");
        break;
    case "Sans Serif":
        $html.addClass("sansserif");
        break;
    case "OpenDyslexic":
        $html.addClass("opendyslexic");
        break;
}};
Setting.addList("fontFamily", {
    label		: "Change font type",
    desc        : "Choose between a Serif, Sans-serif, or the OpenDyslexic Font", 
    list		: settingFontFamily,
    default     : "Serif", 
    onInit		: fontFamily,
    onChange	: fontFamily
});	

        //~ ~ Font Size ~ ~
var settingFontSize = ["75%", "100%", "125%", "150%"];
var resizeFont = function() {
var size = document.getElementById("passages");
switch (settings.fontSize) {
    case "100%":
        size.style.fontSize = "100%";
        break;
    case "75%":
        size.style.fontSize = "75%";
        break;
    case "125%":
        size.style.fontSize = "125%";
        break;
    case "150%":
        size.style.fontSize = "150%";
        break;
}
};
Setting.addList("fontSize", {
    label		: "Change Font Size",
    list		: settingFontSize,
    default     : "100%",
    onInit		: resizeFont,
    onChange	: resizeFont
});

    //~ ~ ~ ~ SAVING (Auto/Name) ~ ~ ~ ~
Setting.addHeader("Save Settings");

Config.saves.isAllowed = function () {
    if (tags().includes('noreturn')) { 
        return false;
    }
    return true;
};

        //~ ~ Autosave Toggle ~ ~
Config.saves.autosave = function () {
    if (settings.autosave) {
        return true 
}};
Setting.addToggle("autosave", {
    label       : "Autosaves",
    default     : false,
});

        //~ ~ Autoname Toggle ~ ~
Save.onSave.add( function (save, details) {
    if (settings.autoname) {
        save.title = (State.getVar("$FirstName") ? State.getVar("$FirstName") : '???');
            //This is essentially asking if the variable is defined ? if yes show this - otherwise (:) show that
    } else if (details.type == "autosave") {
        //If Autoname is disabled but the autosave is enabled, this will be the name of the autosave
        save.title = "Autosave";
    } else {
        //This will prompt the player to enter a name for the save file
        save.title = prompt("Enter Save Name:", save.title);
}});

Setting.addToggle("autoname", {
    label       : "Autoname",
    desc        : "description of title if enabled",
    default     : false,
});

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
