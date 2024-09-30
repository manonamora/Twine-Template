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
        // ~ Notifications
        // ~ Theme Change
    //~ ~ MACROS ~ ~ 
        // ~ Liveupdate
        // ~ Notify
        // ~ Dialog API

//~ ~ ~ ~ Passage Cleanup ~ ~ ~ ~ 
    // Reset Passage to top
    $(document).on(":passagedisplay", function() {
        $("#inside").scrollTop(0);
    });
        // Reset dialog box to top
    $(document).on(':dialogopened', function (ev) {
        $("#ui-dialog-body").scrollTop(0);
    });
            //Note: #inside has overflow set in CSS. If you change the name of that class or move the overflow, don't forget to edit this part, or it won't reset properly 
    
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
    //-- > config.saves.autosave = true; <-- if you want the autosave to be on for all passages. Delete the setting toggle below in that case.
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
        // ~NOTIFICATIONS~
    var settingNoNotificationHandler = function () {
        if (settings.nonotif) { // is true
            $("html").addClass("nonotif");
        }
        else { // is false
            $("html").removeClass("nonotif");
        }
    };
    Setting.addToggle("nonotif", {
        label : "Disable Notification",
        default : true,
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
        }
    };
    Setting.addList("theme", {
        label    : "Switch display mode",
        list     : settingThemeNames,
        default	 : "Purple",
        onInit   : settingThemeHandler,
        onChange : settingThemeHandler
    });
        //Note: You can add as many theme as you want. Here are just 3.
        
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    
    //~ ~ ~ ~ CUSTOM MACROS~ ~ ~ ~ 
        // ~LIVEUPDATE~
            //Note: Used for the Menu Toggle. Can update the passage without reload. See Credits for manual link (Cycy)
    (function () {
        "use strict";
    
        $(document).on(":liveupdate", function () {
            $(".macro-live").trigger(":liveupdateinternal");
        });
    
        Macro.add(['update', 'upd'], {
            handler: function handler() {
                $(document).trigger(":liveupdate");
            }
        });
    
        Macro.add(['live', 'l', 'lh'], {
            skipArgs: true,
            handler: function handler() {
                if (this.args.full.length === 0) {
                    return this.error('no expression specified');
                }
                try {
                    var statement = this.args.full;
                    var result = toStringOrDefault(Scripting.evalJavaScript(statement), null);
                    if (result !== null) {
                        var lh = this.name === "lh";
                        var $el = $("<span></span>").addClass("macro-live").wiki(lh ? Util.escape(result) : result).appendTo(this.output);
                        $el.on(":liveupdateinternal", this.createShadowWrapper(function (ev) {
                            var out = toStringOrDefault(Scripting.evalJavaScript(statement), null);
                            $el.empty().wiki(lh ? Util.escape(out) : out);
                        }));
                    }
                } catch (ex) {
                    return this.error("bad evaluation: " + (_typeof(ex) === 'object' ? ex.message : ex));
                }
            }
        });
    
        Macro.add(['liveblock', 'lb'], {
            tags: null,
            handler: function handler() {
                try {
                    var content = this.payload[0].contents.trim();
                    if (content) {
                        var $el = $("<span></span>").addClass("macro-live macro-live-block").wiki(content).appendTo(this.output);
                        $el.on(":liveupdateinternal", this.createShadowWrapper(function (ev) {
                            $el.empty().wiki(content);
                        }));
                    }
                } catch (ex) {
                    return this.error("bad evaluation: " + (_typeof(ex) === 'object' ? ex.message : ex));
                }
            }
        });
    })();
        //~ NOTIFY~
            //Note: See Credits for manual link (Chapel)
    ;!function(){var s=/\d+m?s$/;function e(s,e,t){"string"==typeof s&&("number"!=typeof e&&(e=!1),$(document).trigger({type:":notify",message:s,delay:e,class:t||""}))}$(document.body).append("<div id='notify'></div>"),$(document).on(":notify",(function(s){s.message&&"string"==typeof s.message&&(s.message.trim(),s.class?"string"==typeof s.class?s.class="open macro-notify "+s.class:Array.isArray(s.class)?s.class="open macro-notify "+s.class.join(" "):s.class="open macro-notify":s.class="open macro-notify",s.delay?("number"!=typeof s.delay&&(s.delay=Number(s.delay)),Number.isNaN(s.delay)&&(s.delay=2e3)):s.delay=2e3,$("#notify").empty().wiki(s.message).addClass(s.class),setTimeout((function(){$("#notify").removeClass()}),s.delay))})),Macro.add("notify",{tags:null,handler:function(){var t=this.payload[0].contents,a=!1,n=!1;if(this.args.length>0){var i=s.test(this.args[0]);"number"==typeof this.args[0]||i?(a=i?Util.fromCssTime(this.args[0]):this.args[0],n=this.args.length>1&&this.args.slice(1).flatten()):n=this.args.flatten().join(" ")}e(t,a,n)}}),setup.notify=e}();
        //~ DIALOG API~
            //Note: See Credits for manual link (Chapel)
    ;Macro.add("dialog",{tags:["onopen","onclose"],handler:function(){var t="",s=null,n=null,o=this.args.length>0?this.args[0]:"",e=this.args.length>1?this.args.slice(1).flatten():[];this.payload.forEach((function(o,e){0===e?t=o.contents:"onopen"===o.name?s=s?s+o.contents:o.contents:n=n?n+o.contents:o.contents})),e.push("macro-"+this.name),Dialog.setup(o,e.join(" ")),Dialog.wiki(t),s&&"string"==typeof s&&s.trim()&&$(document).one(":dialogopened",(function(){$.wiki(s)})),n&&"string"==typeof n&&n.trim()&&$(document).one(":dialogclosed",(function(){$.wiki(n)})),Dialog.open()}}),Macro.add("popup",{handler:function(){if(this.args.length<1)return this.error("need at least one argument; the passage to display");if(!Story.has(this.args[0]))return this.error("the passage "+this.args[0]+"does not exist");var t=this.args[0],s=this.args.length>1?this.args[1]:"",n=this.args.length>2?this.args.slice(2).flatten():[];n.push("macro-"+this.name),Dialog.setup(s,n.join(" ")),Dialog.wiki(Story.get(t).processText()),Dialog.open()}}),Macro.add("dialogclose",{skipArgs:!0,handler:function(){Dialog.close()}});
    
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    