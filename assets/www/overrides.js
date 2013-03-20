//set some defaults before the app loads
$(document).bind("mobileinit", function () {
    $.mobile.pageContainer = $('#container');
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.mobile.useFastClick = true;
});