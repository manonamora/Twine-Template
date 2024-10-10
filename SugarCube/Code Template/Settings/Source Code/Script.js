//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS~ ~ ~ ~
    //~ ~ SETTINGS OPTIONS ~ ~
        // ~ Font Type
        // ~ Font Size
        // ~ Line Height
        // ~ Text Alignment
        // ~ Theme
        // ~ Volume
        // ~ Animation Toggle
        // ~ Notification Toggle
        // ~ Autosave Toggle
        // ~ Autoname Toggle
    //~ ~ MACROS ~ ~
        // ~ Notify
        
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ SETTINGS OPTIONS ~ ~ ~ ~
    /*
     Notes:
        ~ Settings are displayed in the order it was coded in this section. If you do not like the order below, just move the code around.
        ~ Settings should fit what your project needs, so add what is necessary and remove what is unwanted.
            ~ Same with the Headers and descriptions of headers/settings. Just because I wrote it this way doesn't mean you have to.
        ~ The code below include the Settings most used or requested in Interactive-Fiction communities, when it comes to accessibility.
    */

    //~ ~ ~ ~ TEXT DISPLAY ~ ~ ~ ~
    Setting.addHeader("Text Display", "Below are settings controlling how the text is displayed");
    /*
     Note:
        ~ Headers are coded as follow: 
            Setting.addHeader(name [, description]);
          with the description being optional. Other headers coded here are without descriptions.
    */
        
        //~ ~ Font Type ~ ~
    /*
        This is the most used and recommended Setting when creating a project. Since there isn't a font that everyone find comfortable to read, adding multiple options makes your project accessible to more people.
        The Setting below only account for 3 different options: a serif, sans-serif, and monospace font. It is recommended to include multiple (~2) fonts for each type, so readers have choices when playing.
            > you can name the classes based on the fonts you're importing, i'm just using the types here as an example.
    */
var settingFontFamily = ["Serif", "Sans Serif", "Monospace"]; 
    //The selectable options, name visible to the player
    //Add or remove them (each should be separated by a comma)
var fontFamily = function() {
    var $html = $("html"); 
    $html.removeClass("serif sansserif monospace"); 
        //this code above will remove any font class used before the switch
    switch (settings.fontFamily) { 
        //this section will add the relevant font class, depending on the player's choice
        case "Serif": 
            // the case name should be the same as the option defined in the first line
            $html.addClass("serif"); 
                //each option need to be set in the StyleSheet (CSS), through a class 
                //[.class]
            break;
        case "Sans Serif":
            $html.addClass("sansserif");
            break;
        case "Monospace":
            $html.addClass("monospace");
            break;
        /*
        To add a new font to the list:
            ~ Add the Name of the new option inside > var settingFontFamily
            ~ Add a CSS font class inside > $html.removeClass
            ~ Add another case block inside > switch (settings.fontFamily)

            case "Font Option"
                $html.addClass("css-tag-for-the-new-font");
                break;
        */
    }
};
Setting.addList("fontFamily", {
    //This is the actual Setting, visible to the player
    label		: "Change font type",
    desc        : "Choose between a Serif, Sans-serif, or the OpenDyslexic Font", 
        //descriptions of settings are optional, so you can edit or remove this line
    list		: settingFontFamily,
    default     : "Serif", 
        //If you delete the default line, the system will pick the first selectable name option as the new default
    onInit		: fontFamily,
    onChange	: fontFamily
});	

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Font Size ~ ~
    /*
        There are *many* ways to include a Font Size Settings, from using a size slider instead of a drop down, to using class defined in the StyleSheet (logic similar to the previous settings). The defined option below uses a Dropdown option, with pure JavaScript to assign a new font size to #passages when that Setting is interacted with.
    */
var settingFontSize = ["75%", "100%", "125%", "150%"];
    //The selectable options, name visible to the player
    //Add or remove them (each should be separated by a comma)
var resizeFont = function() {
    var size = document.getElementById("passages"); 
        //This is linked to #passages in the CSS
    /*
        From here, you have 2 options:
        - assigning automatically the selectable option (%) to the element
        - defining manually each size in other units (px, em, large/small...)

        Since the Setting can only handle one at a time, Option 1 is "hidden" as a comment.
    */
    // > Option 1:
    // size.style.fontSize = settings.fontSize;

    // > Option 2:
    switch (settings.fontSize) {
        case "75%":
            size.style.fontSize = "75%";
            // Instead of "75%", you could have "small" or "12px" or "0.75em", etc...
            // But if you're sticking to %, just use Option 1 instead.
            break;
        case "100%":
            size.style.fontSize = "100%";
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

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Line Height ~ ~
    /*
        This is more of an uncommon setting, as line-heights (space between each line) are not usually modified.
        The code below is essentially the same as the Font Type setting, but targetting a different CSS rule in the StyleSheet.
    */
var settingLineHeight = ["75%", "100%", "125%", "150%"];
    //The selectable options, name visible to the player
    //Add or remove them (each should be separated by a comma)
    //You can also edit it, like "75%" becomes "Small"
var lineHeight = function () {
    var $html = $("html");
    $html.removeClass("lh-small lh-medium lh-large lh-biggest");
        //this code above will remove any font class used before the switch
    switch (settings.lineheight) {
        //this section will add the relevant font class, depending on the player's choice
        case "75%":
            // the case name should be the same as the option defined in the first line
            $html.addClass("lh-small");
                //each option need to be set in the StyleSheet (CSS), through a class 
                //[.class]
            break;
        case "100%":
            $html.addClass("lh-medium");
            break;	
        case "125%":
            $html.addClass("lh-large");
            break;	
        case "150%":
            $html.addClass("lh-biggest");
            break;	
    }
};
Setting.addList("lineheight", {
    label       : "Change Line Height",
    default     : "100%",
    list        : settingLineHeight,
    onInit      : lineHeight,
    onChange    : lineHeight
});
    
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Text Alignment ~ ~
    /*
        Unlike the previous Settings, which are Drop-down lists, this one is a Toggle, which will change the alignment of the text from justified to left (and vice-versa).
        If you are planning on including other alignments (right, center), you should change the setting into a Drop-down instead. This version can only take into account 2 options.
    */
var settingtextAlign = function () {
    if (settings.textalign) { // setting is true
        $("html").addClass("justified");
            // if enabled, the setting with add the class [.justified] to the page
            // the class defined in the StyleSheet will justify the text.
    } else { // setting is false
        $("html").removeClass("justified");
}};
Setting.addToggle("textalign", {
    label       : "Change Text Alignment",
    desc        : "If enabled, the text will be justified",
    default     : false,
    onInit      : settingtextAlign,
    onChange    : settingtextAlign
});

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

    //~ ~ ~ ~ SOUND/THEME ~ ~ ~ ~
Setting.addHeader("Mode and Volume");

        //~ ~ Theme ~ ~
    /*
        Another very popular setting, especially since Light/Dark modes are divisive (some peeps prefer light palettes, other dark ones). While you could use [@media (prefers-color-scheme: dark/light)] to set themes depending on the user's browser preferences, it is recommended to let the player choose which ever theme they prefer in the moment (Light, Dark, or other).
        The Setting essentially allows the use of different colour palette, which can be harnessed to give different vibes to the story/game.
        
            Either way, you should ensure the colours chosen in your palette are accessible (i.e. have enough contrast to be readable and comfortable). 
    
        The example here displays a simple Light/Dark option.
    */
var settingThemeNames = ["Light", "Dark"]; 
    //The selectable options, name visible to the player
    //Add more options if wanted (each should be separated by a comma)
    //If kept at 2, you could change it to a Toggle instead.
var changeTheme = function () {
    var $html = $("html");
    $html.removeClass("rev");
    switch (settings.theme) {
        case "Dark":
            $html.addClass("rev");
            break;
        /*
         To add a new theme to the list:
            ~ Add the Name of the new Theme inside > var settingThemeNames
            ~ Add a CSS font class inside > $html.removeClass
                $html.removeClass("rev new-class")
            ~ Add another case block inside > switch (settings.theme)

            case "Theme-XYZ"
                $html.addClass("the-new-theme-class");
                break;
        */
    }
};
Setting.addList("theme", {
    label       : "Switch display mode",
    list        : settingThemeNames,
    default	    : "Dark",
    onInit      : changeTheme,
    onChange    : changeTheme
});

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Volume ~ ~
    /*
        This Setting is mainly useful if you plan on adding sound (music/SFX) to your game. It will only control the general volume (Master Volume) of the sound played, not the specific track being played (this is done with the <<audio>> macro).

        The Setting will be useless for Mobile users, as mobile browser override the volume with the device's volume. In computer browsers, players can change the volume of both their device's and the tab the game is run on, without touching this setting.

        By fiddling with the [function ()] and the Audio APIs (pretty advanced), you could create volume sliders for groups of tracks (background/voice over/ etc...).
    */
var settingMasterVolumeHandler = function () {
	SimpleAudio.volume(settings.masterVolume / 10);
};
Setting.addRange("masterVolume", {
	label    : "Master volume.",
	min      : 0,
	max      : 10,
	step     : 1,
	onInit   : settingMasterVolumeHandler,
	onChange : settingMasterVolumeHandler
});

//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 


    //~ ~ ~ ~ OTHER ACCESSIBILITY ~ ~ ~ ~
Setting.addHeader("Accessibility");

        //~ ~ Animation Toggle ~ ~
    /*
        If you are going to include *any* form of animation (changes in movement/colour/display or including .gif), you should include a setting to hide those, so users with sensitivity to animated content (e.g. epilepsy, photosensitivity, motion sickness...).

        The Toggle below is can be used for both elements defined in the StyleSheet, and in passages themselves (see the Demo page).
    */
var settingAnimation = function () {
    if (settings.textanim) { // setting is true
        $("html").removeClass("nogif");
            // if enabled, the setting with remove the class [.nogif] from the page
            // this will display any animated content defined in the Stylesheet
    } else { // setting is false
        $("html").addClass("nogif");
}};
Setting.addToggle("textanim", {
    label       : "Show Animation",
    desc        : "If disabled, there won't be any animated element on the page.",
    default     : true,
    onInit      : settingAnimation,
    onChange    : settingAnimation
});

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Notification Toggle ~ ~
    /*
        This Setting is another form of the Toggle-type, in that it *doesn't* link the setting to a CSS class. You only get a setting variable that can be used in-game to display/hide elements (like a notification popup).
        
        You can still change it to the other version, to hide your notifications/popups through the Stylesheet instead.

        ~ If your notification is animated, you could also simply combine the Animation and Notification Toggles into one single setting.
    */
Setting.addToggle("notif", { 
    label       : "Show Notification",
    desc        : "If disabled, you will not be notified.",
    default     : true,
});


//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

    //~ ~ ~ ~ SAVING (Auto/Name) ~ ~ ~ ~
Setting.addHeader("Save Settings");

    /* 
     The Config below will check:
        - the type of save (auto or browser slot)
            - for autosave: if the autosave setting  is enabled
        - then whether a passage is tagged with [noreturn]
     If the passage isn't tagged, it will save the game (auto/manual), otherwise, nothing will happen.

     If you want to have more tags restricting saving:
        - for any passage including either tags
            tags().includesAny('noreturn', 'another-tag', 'something-else')
        - for any passage including ALL the tags:
            tags().includesAll('noreturn', 'another-tag', 'something-else')
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

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Autosave Toggle ~ ~
    /*
        To include an Autosave Setting in your project, you need to enable at least one slot (the Config line below) and ensure the playthrough isn't saved if the player disabled the setting (Config block above).
        Then, you just need a simple toggle. 
    */
Config.saves.maxAutoSaves = 1;
Setting.addToggle("autosave", {
    label       : "Autosaves",
    default     : false,
});

    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //~ ~ Autoname Toggle ~ ~
    /* 
        Before creating the Toggle, we need to define *how* the name of a save will look like - as well, as making a clear distinction between Autosaves and Manual browser saves. 
            > By default, SugarCube uses the number of "turns" (seen passages) the player has done.

        First, we'll have to check the save type (auto/manual), then if autoname is enabled. The Autosave will always be automatically named (otherwise the player will get a prompt on every passage to enter a new name).

        The Save Name defined below will be simple: using the name of the PC + current chapter -> both saved in variables.
            > If you're not using these variables in your project, just change it to whatever fits best!
            > State.getVar("$var") = State.variables.var

        If you plan on using the name of a passage, you will need to include [passage()].
            > Note: you should be sure the name of passages are meaningful, like "Entrance to Manor" instead of "Ch10-2"
    */

Config.saves.descriptions = function (saveType) {
    switch (saveType) {
      //This checks what type of save we're dealing with (auto or manual)
        case Save.Type.Auto: {
            return "Autosave: " + (State.getVar("$FirstName") ? State.getVar("$FirstName") : '???') + " - " + State.getVar("$chapter");
            // the second section (after +) will check if $FirstName is defined, before either printing the value (defined) or ??? (not defined)
            // An alternative:
            // return "Autosave: " + passage();
            break;
        }
        default: {
            if (settings.autoname) {
                return (State.getVar("$FirstName") ? State.getVar("$FirstName") : '???') + " - " + State.getVar("$chapter");
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
    desc        : "Title of Save Slots if enabled.",
    default     : false,
});


//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

    //~ ~ ~ ~ MACROS ~ ~ ~ ~
// notify.min.js, for SugarCube 2, by Chapel
// v1.1.1, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){var s=/\d+m?s$/;function e(s,e,t){"string"==typeof s&&("number"!=typeof e&&(e=!1),$(document).trigger({type:":notify",message:s,delay:e,class:t||""}))}$(document.body).append("<div id='notify'></div>"),$(document).on(":notify",(function(s){s.message&&"string"==typeof s.message&&(s.message.trim(),s.class?"string"==typeof s.class?s.class="open macro-notify "+s.class:Array.isArray(s.class)?s.class="open macro-notify "+s.class.join(" "):s.class="open macro-notify":s.class="open macro-notify",s.delay?("number"!=typeof s.delay&&(s.delay=Number(s.delay)),Number.isNaN(s.delay)&&(s.delay=2e3)):s.delay=2e3,$("#notify").empty().wiki(s.message).addClass(s.class),setTimeout((function(){$("#notify").removeClass()}),s.delay))})),Macro.add("notify",{tags:null,handler:function(){var t=this.payload[0].contents,a=!1,n=!1;if(this.args.length>0){var i=s.test(this.args[0]);"number"==typeof this.args[0]||i?(a=i?Util.fromCssTime(this.args[0]):this.args[0],n=this.args.length>1&&this.args.slice(1).flatten()):n=this.args.flatten().join(" ")}e(t,a,n)}}),setup.notify=e}();
// end notify.min.js