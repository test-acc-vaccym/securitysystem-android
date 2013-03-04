var apiURL = 'http://securitysystem.herokuapp.com';
var oldKey = "";
var viewSensorTrippedVar = $('#view-sensor-tripped');
var viewSensorTrippedImgVar = $('#view-sensor-tripped-img');
var viewSensorEnabledVar = $('#view-sensor-enabled');


//set some defaults before the app loads
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
});

//set sensor information on edit popup
$(document).on('vclick', '.edit-gear', function () {
    var key = $(this).parent().find('p').text();
    var edit = $('#edit');
    edit.find('#edit-sensor-name').val($(this).parent().find('h3').text());
    edit.find('#edit-sensor-key').val(key);
    oldKey = key;
});

//set sensor information on view popup
$(document).on('vclick', '.view-button', function(){
    var key = $(this).find('p').text();

    try{
        $.getJSON(apiURL+'/sensors/'+key, function(sensor){
            $('#view-sensor-name').text(sensor.sensor.name);
            $('#view-sensor-key').text(sensor.sensor.sensor_id);
            if(sensor.sensor.enabled){
                viewSensorEnabledVar.val('on').slider('refresh');
                if(sensor.sensor.tripped){
                    viewSensorTrippedImgVar.attr('src', 'img/danger.png');
                    viewSensorTrippedVar.text("TRIPPED");
                }
                else{
                    viewSensorTrippedImgVar.attr('src', 'img/check.png');
                    viewSensorTrippedVar.text("Ready");
                }
            }
            else {
                viewSensorEnabledVar.val('off').slider('refresh');
                viewSensorTrippedImgVar.attr('src', 'img/disabled.png');
                viewSensorTrippedVar.text("Disabled");
            }

        });
    }
    catch(error){
        alert("Couldn't fetch sensor info!");
    }
});

//reset sensor
$(document).on('vclick', '#reset-button', function(){
    if(viewSensorEnabledVar.val() == 'on'){
        viewSensorTrippedImgVar.attr('src', 'img/check.png');
        viewSensorTrippedVar.text("Ready");
    }
    else{
        viewSensorTrippedImgVar.attr('src', 'img/disabled.png');
        viewSensorTrippedVar.text("Disabled");
    }
});

//enable/disable sensor
$(document).on('slidestop', '#view-sensor-enabled', function(){
    if(viewSensorEnabledVar.val() == 'on'){
        if(viewSensorTrippedVar.text() == "TRIPPED"){
            viewSensorTrippedImgVar.attr('src', 'img/danger.png');
            viewSensorTrippedVar.text("TRIPPED");
        }
        else{
            viewSensorTrippedImgVar.attr('src', 'img/check.png');
            viewSensorTrippedVar.text("Ready");
        }
    }
    else {
        viewSensorTrippedImgVar.attr('src', 'img/disabled.png');
        viewSensorTrippedVar.text("Disabled");
    }
});

//submit save sensor
$(document).on('vclick', '#view-sensor-save', function(){
    var tripped = viewSensorTrippedVar.text() == "TRIPPED";
    $.ajax({
        type: "PUT",
        url: apiURL+"/sensors/"+$('#view-sensor-key').text(),
        data: {sensor: { enabled: viewSensorEnabledVar.val(), tripped: tripped }}
    }).done(function(){
            reloadSensorList();
        });
});

//submit edit sensor
$(document).on('submit','#edit-sensor-form',function(){
    var name = $(this).find('#edit-sensor-name').val();
    var key = $(this).find('#edit-sensor-key').val();
    $.ajax({
        type: "PUT",
        url: apiURL+"/sensors/"+oldKey,
        data: {sensor: { name:name, sensor_id:key }}
    }).done(function() {
            reloadSensorList();
    });
});

//submit delete sensor
$(document).on('vclick', '#delete-sensor-button', function () {
    $.ajax({
        type: "DELETE",
        url: apiURL+"/sensors/"+oldKey
    }).done(function() {
            reloadSensorList();
        });
});

//submit add new sensor
$(document).on('submit','#add-sensor-form',function(){
    var pushID = "";

    try{
        pushID = window.getAPID.getAPID();
    } catch(err){
        alert("Couldn't get APID!");
        pushID = " ";
    }

    var name = $('#new-sensor-name').val();
    var id = $('#new-sensor-key').val();

    $.ajax({
        type: "POST",
        url: apiURL+"/sensors/",
        data: {sensor: { name:name, sensor_id:id, enabled:true, tripped:false, client_apid:pushID }}
    }).done(function() {
            reloadSensorList();
            $('#new-sensor-name').val('');
            $('#new-sensor-key').val('');
        });
});

$(document).on('vclick','#refresh-button',function(){
    reloadSensorList();
});

$(document).on('pagebeforeshow', '#sensorpage',function () {
    reloadSensorList();
});

function reloadSensorList(){
    try{
        $.mobile.loading('show');
        $.getJSON(apiURL+'/sensors.json', function(sensors){
            //populate the listview with items from sensors array
            var sensorlist = $('#sensorlist');
            sensorlist.empty();
            for (var i in sensors) {
                if (sensors.hasOwnProperty(i)) {
                    var newItem = $('<li/>');
                    var inner = $('<a/>', {'class': 'view-button' ,'href': '#view', 'data-rel': 'popup', 'data-transition': 'pop', 'data-position-to': 'window'});

                    if(sensors[i].sensor.enabled){
                        if(sensors[i].sensor.tripped){
                            inner.append($('<img/>', {'src': 'img/danger.png'}));
                        }
                        else {
                            inner.append($('<img/>', {'src': 'img/check.png'}));
                        }
                    }
                    else{
                        inner.append($('<img/>', {'src': 'img/disabled.png'}));
                    }

                    inner.append($('<h3/>', {'text': sensors[i].sensor.name }));
                    inner.append($('<p/>', {'text': sensors[i].sensor.sensor_id}));
                    newItem.append(inner);
                    newItem.append($('<a/>', {'class': 'edit-gear', 'href': '#edit', 'data-rel': 'popup', 'data-transition': 'pop', 'data-position-to': 'window'}));
                    sensorlist.append(newItem);
                }
            }
            sensorlist.listview('refresh');
            $.mobile.loading('hide');
        });
    }
    catch(error){
        alert("Couldn't get the sensor list!");
    }

}
