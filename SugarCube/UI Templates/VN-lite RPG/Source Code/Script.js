//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

//~ ~ ~ ~ TABLE OF CONTENTS~ ~ ~ ~
    //~ ~ Passage Cleanup ~ ~
        // ~ Reset Passage to top
    //~ ~ SETTINGS~ ~
        // ~ Autosave

//~ ~ ~ ~ Passage Cleanup ~ ~ ~ ~
    // ~ Reset Passage to top
$(document).on(":passagedisplay", function() {
	$("#passages").scrollTop(0);
});

//~ ~ ~ ~ SETTINGS OPTIONS ~ ~ ~ ~
    /*
        For more Setting Options, see my Setting Template: https://manonamora.itch.io/twine-sugarcube-templates
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
        // manual save section
        if (tags().includes('noreturn')) {
            //this checks that the player isn't on a tagged passage before allowing saving
            return false;
        }
        return true;
    }
};
        //~ ~ Autosave Toggle ~ ~
Config.saves.maxAutoSaves = 1;
Setting.addToggle("autosave", {
    label : 'Autosave.',
    desc: 'When toggled, the game will autosave when moving to a new page.',
    default  : false,
});
//~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 