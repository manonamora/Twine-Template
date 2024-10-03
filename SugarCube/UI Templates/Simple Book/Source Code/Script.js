//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS ~ ~ ~ ~ 
    //~ ~ Passage Cleanup ~ ~ 
        // ~ Reset Passage to top
    //~ ~ SETTINGS ~ ~ 
        // ~ Font Size
        // ~ Font Type
        // ~ Autosave
        // ~ Naming Saves
        // ~ Notifications
        // ~ Theme Change
    //~ ~ MACROS ~ ~ 
        // ~ Notify
        // ~ Dialog API

//~ ~ ~ ~ Passage Cleanup ~ ~ ~ ~ 
    // Reset Passage to top
$(document).on(":passagedisplay", function() {
    $("#passages").scrollTop(0);
});

//~ ~ ~ ~ SETTINGS~ ~ ~ ~ 
    /*
        The annotations in this section are limited, as settings are better explained in my Setting Template (https://manonamora.itch.io/twine-sugarcube-templates) or my Guide (https://manonamora.itch.io/twine-sugarcube-guide). 
        
        You can also find more Settings option in that Setting Template.

        Note: the Settings are shown in the popup in the order coded below.
    */
Setting.addHeader("Font Settings");

    //~ ~ FONT SIZE ~ ~ 
var settingFontSize = ["75", "100%", "125%", "150%"];
var resizeFont = function() {
    var size = document.getElementById("passages");
    size.style.fontSize = settings.fontSize;
};
Setting.addList("fontSize", {
    label		: "Change font size.",
    list		: settingFontSize,
    default     : "100%",
    onInit		: resizeFont,
    onChange	: resizeFont
});

    //~ ~ FONT TYPE ~ ~
var settingFontFamily = ["Serif", "Sans Serif", "Monospace"];
    /* I would recommend adding multiple font options for each type (serif, sans-serif, and monospace) for accessibility. */
var fontFamily = function() {
    var $html = $("html");
        $html.removeClass("sansserif serif monospace");
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
    label		: "Change font style.",
    list		: settingFontFamily,
    default     : "Sans Serif",
    onInit		: fontFamily,
    onChange	: fontFamily
});

  //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Setting.addHeader("Save Settings");

Config.saves.maxSlotSaves = 6;
/*
    The code below will restrict saving if the player is in a [noreturn] tagged passage (e.g. Title/Codex/Long Return). Also takes it into account for Autosaves.
*/  
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

    //~ ~ AUTOSAVE ~ ~
Config.saves.maxAutoSaves = 1;
Setting.addToggle("autosave", {
    label   : "Autosaves",
    default : false,
}); 
    //~ NAMING SAVES~ 
Config.saves.descriptions = function (saveType) {
    switch (saveType) {
      //Checks the type of save (auto or manual)
        case Save.Type.Auto: {
            // Autoname is forced for Autosaves, otherwise players have to enter a name with every passage
            return "Autosave: " + (State.getVar("$Name") ? State.getVar("$Name") : '???');
            // the second section (after +) checks if $Name is defined, before either printing the value (defined) or ??? (not defined)
            // An alternative:
            // return "Autosave: " + passage();
            break;
        }
        default: {
            if (settings.autoname) {
                return (State.getVar("$Name") ? State.getVar("$Name") : '???');
            }
            else {
                return prompt("Enter Save Name:", passage());
                // I've included [passage()] here as the text inside the prompt box, but you can change it to whatever, like "" (empty) or "SAVE!" or State.getVar("$var")...
            }
        }
    }
};
Setting.addToggle("autoname", {
    label   : "Autoname",
    desc    : "If enabled, the saves will be named after your character.",
    default : false,
}); 

  //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Setting.addHeader("Other Settings");
    // ~ ~ NOTIFICATIONS ~ ~
var settingNoNotificationHandler = function () {
    if (settings.nonotif) { // is true (notification disabled)
        $("html").addClass("nonotif");
    }
    else { // is false (notification enabled)
        $("html").removeClass("nonotif");
    }
};
Setting.addToggle("nonotif", {
    label    : "Disable Notification",
    default  : false,
    onInit   : settingNoNotificationHandler,
    onChange : settingNoNotificationHandler
});

    //~ THEME CHANGE~ 
var settingThemeNames = ["Purple", "Green", "Orange"];
var settingThemeHandler = function () {
    var $html = $("html");
    $html.removeClass("gn or");
    switch (settings.theme) {
        case "Green":
            $html.addClass("gn");
            break;
        case "Orange":
            $html.addClass("or");
            break;
        /*
            If you add a theme or change the name of a class, don't forget to edit your StyleSheet as well!
        */
    }
};
Setting.addList("theme", {
    label    : "Switch display mode",
    list     : settingThemeNames,
    default	 : "Purple",
    onInit   : settingThemeHandler,
    onChange : settingThemeHandler
});
    
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ CUSTOM MACROS~ ~ ~ ~ 
 
    //~ NOTIFY~
        //Note: See Credits for manual link (Chapel)
;!function(){var s=/\d+m?s$/;function e(s,e,t){"string"==typeof s&&("number"!=typeof e&&(e=!1),$(document).trigger({type:":notify",message:s,delay:e,class:t||""}))}$(document.body).append("<div id='notify'></div>"),$(document).on(":notify",(function(s){s.message&&"string"==typeof s.message&&(s.message.trim(),s.class?"string"==typeof s.class?s.class="open macro-notify "+s.class:Array.isArray(s.class)?s.class="open macro-notify "+s.class.join(" "):s.class="open macro-notify":s.class="open macro-notify",s.delay?("number"!=typeof s.delay&&(s.delay=Number(s.delay)),Number.isNaN(s.delay)&&(s.delay=2e3)):s.delay=2e3,$("#notify").empty().wiki(s.message).addClass(s.class),setTimeout((function(){$("#notify").removeClass()}),s.delay))})),Macro.add("notify",{tags:null,handler:function(){var t=this.payload[0].contents,a=!1,n=!1;if(this.args.length>0){var i=s.test(this.args[0]);"number"==typeof this.args[0]||i?(a=i?Util.fromCssTime(this.args[0]):this.args[0],n=this.args.length>1&&this.args.slice(1).flatten()):n=this.args.flatten().join(" ")}e(t,a,n)}}),setup.notify=e}();

    //~ DIALOG API~
        //Note: See Credits for manual link (Chapel)
;Macro.add("dialog",{tags:["onopen","onclose"],handler:function(){var t="",s=null,n=null,o=this.args.length>0?this.args[0]:"",e=this.args.length>1?this.args.slice(1).flatten():[];this.payload.forEach((function(o,e){0===e?t=o.contents:"onopen"===o.name?s=s?s+o.contents:o.contents:n=n?n+o.contents:o.contents})),e.push("macro-"+this.name),Dialog.create(o,e.join(" ")),Dialog.wiki(t),s&&"string"==typeof s&&s.trim()&&$(document).one(":dialogopened",(function(){$.wiki(s)})),n&&"string"==typeof n&&n.trim()&&$(document).one(":dialogclosed",(function(){$.wiki(n)})),Dialog.open()}}),Macro.add("popup",{handler:function(){if(this.args.length<1)return this.error("need at least one argument; the passage to display");if(!Story.has(this.args[0]))return this.error("the passage "+this.args[0]+"does not exist");var t=this.args[0],s=this.args.length>1?this.args[1]:"",n=this.args.length>2?this.args.slice(2).flatten():[];n.push("macro-"+this.name),Dialog.create(s,n.join(" ")),Dialog.wikiPassage(t),Dialog.open()}}),Macro.add("dialogclose",{skipArgs:!0,handler:function(){Dialog.close()}});

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
