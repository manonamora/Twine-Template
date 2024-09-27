
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS ~ ~ ~ ~ 
    //~ ~ Passage Cleanup ~ ~ 
        // ~ Reset Passage to top
        // ~ Reset Dialog Box to top
    //~ ~ SETTINGS ~ ~ 
        // ~ Font Size
        // ~ Font Type
        // ~ Autosave
        // ~ Naming Saves
        // ~ Theme Change
    //~ ~ CUSTOM MACRO ~ ~ 
        // ~ Chapel Dialog API

//~ ~ ~ ~ Passage Cleanup ~ ~ ~ ~ 
    // Reset Passage to top
    $(document).on(":passagedisplay", function() {
        $("#passages").scrollTop(0);
    });
        // Reset dialog box to top
    $(document).on(':dialogopened', function (ev) {
        $("#ui-dialog-body").scrollTop(0);
    });
    
    //~ ~ ~ ~ SETTINGS~ ~ ~ ~ 
        /*
            For more Setting Options, see my Setting Template: https://manonamora.itch.io/twine-sugarcube-templates
        */
            //Note: The order you add the settings in this part will be the order you will see in the game.
    Setting.addHeader("Font Settings");
            //Note: the Header in the settings follow the <h2> HTML Class.
    
        //~ FONT SIZE~ 
    var settingFontSize = ["100%", "130%", "150%"];
    var resizeFont = function() {
        var size = document.getElementById("passages");
        switch (settings.fontSize) {
            case "100%":
                size.style.fontSize = "100%";
                break;
            case "130%":
                size.style.fontSize = "130%";
                break;
            case "150%":
                size.style.fontSize = "150%";
                break;
        }
    };
    Setting.addList("fontSize", {
        label		: "Change font size.",
        list		: settingFontSize,
        default     : "100%",
        onInit		: resizeFont,
        onChange	: resizeFont
    });
    
        //~ FONT TYPE~ 
    var settingFontFamily = ["Serif", "Sans Serif", "OpenDyslexic"];
    var fontFamily = function() {
        var $html = $("html");
            $html.removeClass("sansserif serif opendyslexic");
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
        }
    };
    Setting.addList("fontFamily", {
        label		: "Change font style.",
        list		: settingFontFamily,
        default     : "Sans Serif",
        onInit		: fontFamily,
        onChange	: fontFamily
    });
        //Note: Any change in class name will need to be changed in the CSS too.
    
    Setting.addHeader("Save Settings");
    
        //~ AUTOSAVE~ 
    //~  > config.saves.autosave = true; <~  if you want the autosave to be on for all passages. Delete the setting toggle below in that case.
    config.saves.isAllowed = function () {
        if (tags().includes('noreturn')) {
            return false; 
            //players can't save if the passage has a tag 'noreturn' (in this templage: title page and Next passage)
        }
            return true;
    };
    Config.saves.autosave = function () {
        if (settings.autosave) {
            return true
        }
    };
    
    Setting.addToggle("autosave", {
        label : "Autosaves",
        default  : false,
    }); 
        //~ NAMING SAVES~ 
    Save.onSave.add(function (save, details) {
        if (settings.autoname) {
            //If Autoname is true, the save will be named by what's in the brakets. Can be variable, passage, whatever you want.
            save.title = State.getVar("$Name");
        } else if (details.type == "autosave") {
            //If Autoname is disabled by the player but the Autosave is enabled,
            save.title = "Autosave - $Name";
        } else {
            //Otherwise, you get a prompt to enter the name
            save.title = prompt("Enter Save Name:", save.title);
        }
    });
    Setting.addToggle("autoname", {
        label : "Autoname",
        desc : "If enabled the saves will be named after your character.",
        default  : false,
    }); 
    
    Setting.addHeader("Other Settings");
    
        //~ THEME CHANGE~ 
    var settingThemeNames = ["Bleached", "Sepia", "Dark"];
    var settingThemeHandler = function () {
        var $html = $("html");
        $html.removeClass("sp dk");
        switch (settings.theme) {
            case "Sepia":
                $html.addClass("sp");
                break;
            case "Dark":
                $html.addClass("dk");
                break;
        }
    };
    Setting.addList("theme", {
        label    : "Switch display mode",
        list     : settingThemeNames,
        default	 : "Bleached",
        onInit   : settingThemeHandler,
        onChange : settingThemeHandler
    });
            //Note: You can add as many theme as you want. 
            //Here are just 3.
    
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    
    //~ ~ ~ ~ CUSTOM MACROS~ ~ ~ ~ 
    // dialog-api-macro-set.min.js, for SugarCube 2, by Chapel
    // v1.3.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
    ;Macro.add("dialog",{tags:["onopen","onclose"],handler:function(){var t="",s=null,n=null,o=this.args.length>0?this.args[0]:"",e=this.args.length>1?this.args.slice(1).flatten():[];this.payload.forEach((function(o,e){0===e?t=o.contents:"onopen"===o.name?s=s?s+o.contents:o.contents:n=n?n+o.contents:o.contents})),e.push("macro-"+this.name),Dialog.setup(o,e.join(" ")),Dialog.wiki(t),s&&"string"==typeof s&&s.trim()&&$(document).one(":dialogopened",(function(){$.wiki(s)})),n&&"string"==typeof n&&n.trim()&&$(document).one(":dialogclosed",(function(){$.wiki(n)})),Dialog.open()}}),Macro.add("popup",{handler:function(){if(this.args.length<1)return this.error("need at least one argument; the passage to display");if(!Story.has(this.args[0]))return this.error("the passage "+this.args[0]+"does not exist");var t=this.args[0],s=this.args.length>1?this.args[1]:"",n=this.args.length>2?this.args.slice(2).flatten():[];n.push("macro-"+this.name),Dialog.setup(s,n.join(" ")),Dialog.wiki(Story.get(t).processText()),Dialog.open()}}),Macro.add("dialogclose",{skipArgs:!0,handler:function(){Dialog.close()}});
    // end dialog-api-macro-set.min.js
    
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 