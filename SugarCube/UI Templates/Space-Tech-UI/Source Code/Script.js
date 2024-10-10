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

//~ ~ ~ ~ SETTINGS OPTIONS ~ ~ ~ ~
    /*
        For more Setting Options, see my Setting Template: https://manonamora.itch.io/twine-sugarcube-templates
    */

    //~ ~ ~ ~ TEXT DYSPLAY ~ ~ ~ ~
Setting.addHeader("Text Display");
        
        //~ ~ Font Type ~ ~
var settingFontFamily = ["Serif", "Sans Serif", "Monospace"];
    /* I would recommend adding multiple font options for each type (serif, sans-serif, and monospace) for accessibility. */
var fontFamily = function() {
    var $html = $("html"); 
    $html.removeClass("serif sansserif monospace");
    switch (settings.fontFamily) {
        case "Serif":
            $html.addClass("serif");
            break;
        case "Sans Serif":
            $html.addClass("sansserif");
            break;
        case "Monospace":
            $html.addClass("monospace");
            break;
        /*
            If you add a font or change the name of a class, don't forget to edit your StyleSheet as well!
        */
    }
};
Setting.addList("fontFamily", {
    label		: "Change font type",
    desc        : "Choose between a Serif, Sans-serif, or Monospace", 
    list		: settingFontFamily,
    default     : "Serif", 
    onInit		: fontFamily,
    onChange	: fontFamily
});	

        //~ ~ Font Size ~ ~
var settingFontSize = ["75%", "100%", "125%", "150%"];
var resizeFont = function() {
    var size = document.getElementById("passages");
    size.style.fontSize = settings.fontSize;
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

Config.saves.maxSlotSaves = 6;
Config.saves.isAllowed = function (saveType) {
    if (saveType === Save.Type.Auto) {
        // this section is just for the autosave
        if (settings.autosave && !tags().includes('noreturn')){
            // this checks that the player has enabled autosaves + isn't on a tagged passage
            return true;
        }
        return false;
    }
    else {
        if (tags().includes('noreturn')) {
            //this checks that the player isn't on a tagged passage
            return false;
        }
        return true;
    }
};

        //~ ~ Autosave Toggle ~ ~
Config.saves.maxAutoSaves = 1;
Setting.addToggle("autosave", {
    label       : "Autosaves",
    default     : false,
});

        //~ ~ Autoname Toggle ~ ~
Config.saves.descriptions = function (saveType) {
    switch (saveType) {
      //This checks what type of save we're dealing with (auto or manual)
        case Save.Type.Auto: {
            return "Autosave: " + (State.getVar("$MCName") ? State.getVar("$MCName") : '#4ib3bhu5hkv') + " - " + State.getVar("$chapter");
            // the second section (after +) will check if $FirstName is defined, before either printing the value (defined) or #4ib3bhu5hkv (not defined)
            // An alternative:
            // return "Autosave: " + passage();
            break;
        }
        default: {
            if (settings.autoname) {
                return (State.getVar("$MCName") ? State.getVar("$MCName") : '#4ib3bhu5hkv') + " - " + State.getVar("$chapter");
            }
            else {
                return prompt("Enter Save Name:", passage());
                // I've included [passage()] here as the text inside the prompt box, but you can change it to whatever, like "" (empty) or "SAVE!" or State.getVar("$var")...
            }
        }
    }
};

Setting.addToggle("autoname", {
    label       : "Autoname",
    desc        : "description of title if enabled",
    default     : false,
});

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
