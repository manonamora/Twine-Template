//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS~ ~ ~ ~
    //~ ~ Passage Cleanup ~ ~
        // ~ Reset Passage to top
        // ~ Reset Dialog Box to top
    //~ ~ SETTINGS~ ~
        // ~ Autosave

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
        label : 'Autosave.',
        desc: 'When toggled, the game will autosave when moving to a new page.',
        default  : false,
    });
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    
    //~ ~ ~ ~ CUSTOM MACRO ~ ~ ~ ~
    
    // dialog-api-macro-set.min.js, for SugarCube 2, by Chapel
    // v1.3.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
    ;Macro.add("dialog",{tags:["onopen","onclose"],handler:function(){var t="",s=null,n=null,o=this.args.length>0?this.args[0]:"",e=this.args.length>1?this.args.slice(1).flatten():[];this.payload.forEach((function(o,e){0===e?t=o.contents:"onopen"===o.name?s=s?s+o.contents:o.contents:n=n?n+o.contents:o.contents})),e.push("macro-"+this.name),Dialog.setup(o,e.join(" ")),Dialog.wiki(t),s&&"string"==typeof s&&s.trim()&&$(document).one(":dialogopened",(function(){$.wiki(s)})),n&&"string"==typeof n&&n.trim()&&$(document).one(":dialogclosed",(function(){$.wiki(n)})),Dialog.open()}}),Macro.add("popup",{handler:function(){if(this.args.length<1)return this.error("need at least one argument; the passage to display");if(!Story.has(this.args[0]))return this.error("the passage "+this.args[0]+"does not exist");var t=this.args[0],s=this.args.length>1?this.args[1]:"",n=this.args.length>2?this.args.slice(2).flatten():[];n.push("macro-"+this.name),Dialog.setup(s,n.join(" ")),Dialog.wiki(Story.get(t).processText()),Dialog.open()}}),Macro.add("dialogclose",{skipArgs:!0,handler:function(){Dialog.close()}});
    // end dialog-api-macro-set.min.js
    //~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    