Setting.addHeader("Visual Setting");

var settingThemeNames = ["Base SC", "Tweego Docu"];
var settingThemeHandler = function () {
    var $html = $("html");
        $html.removeClass("sc-docu");
        switch (settings.theme) {
            case "SC Docu":
                $html.addClass("sc-docu");
                break;
}};
Setting.addList("theme", {
    label    : "Change Theme",
    desc     : "Choose between the Base StyleSheet<br>or the Tweego Documentation",
    list     : settingThemeNames,
    default  : "Tweego Docu",
    onInit   : settingThemeHandler,
    onChange : settingThemeHandler
});

Setting.addHeader("Font Settings");

var settingFontFam = ["Sans-Serif", "Serif", "Monospace", "Cursive"];
var settingFontFamHandler = function () {
    var $html = $("html");
        $html.removeClass("cursive serif mono");
        switch (settings.fontFam) {
            case "Serif":
                $html.addClass("serif");
                break;
            case "Monospace":
                $html.addClass("mono");
                break;
            case "Cursive":
                $html.addClass("cursive");
                break;
}};
Setting.addList("fontFam", {
    label    : "Change Font",
    desc     : "This will use the default fonts of your device.",
    list     : settingFontFam,
    default  : "Sans-Serif",
    onInit   : settingFontFamHandler,
    onChange : settingFontFamHandler
});

    //--FONT SIZE--
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
    label		: "Change Font Size",
    list		: settingFontSize,
    default     : "100%",
    onInit		: resizeFont,
    onChange	: resizeFont
});
