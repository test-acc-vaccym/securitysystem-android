var apiURL = 'http://securitysystem.herokuapp.com';

//set some defaults before the app loads
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
});


//set sensor information on edit popup
$(document).on('vclick', '.edit-gear', function () {
    var edit = $('#edit');
    edit.find('h3').text('Edit ' + $(this).parent().find('h3').text());
    edit.find('p:first').text($(this).parent().find('p').text());
});


//delete sensor
$(document).on('vclick', '#delete-sensor-button', function () {
    var id = $(this).parent().parent().find('p:first').text();
    $.ajax({
        type: "DELETE",
        url: apiURL+"/sensors/"+id
    }).done(function() {
            reloadSensorList();
        });
});


//add new sensor
$(document).on('submit','#add-sensor-form',function(){
    var pushID = "";

    try{
        pushID = window.getAPID.getAPID();
    } catch(err){
        alert("Couldn't get APID! "+err);
    }

    var name = $('#new-sensor-name').val();
    var id = $('#new-sensor-key').val();
    if(pushID === null) {
        pushID="";
    }


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

//reload the sensor list
$(document).on('pagebeforeshow', '#sensorpage',function () {
    reloadSensorList();
});

function reloadSensorList(){
    $.getJSON(apiURL+'/sensors.json', function(sensors){
        //populate the listview with items from sensors array
        var sensorlist = $('#sensorlist');
        sensorlist.empty();
        for (var i in sensors) {
            if (sensors.hasOwnProperty(i)) {
                var newItem = $('<li/>');
                var inner = $('<a/>', {'href': '#'});
                inner.append($('<img/>', {'src': 'img/logo.png'}));
                inner.append($('<h3/>', {'text': sensors[i].sensor.name }));
                inner.append($('<p/>', {'text': sensors[i].sensor.sensor_id}));
                newItem.append(inner);
                newItem.append($('<a/>', {'class': 'edit-gear', 'href': '#edit', 'data-rel': 'popup', 'data-transition': 'pop', 'data-position-to': 'window'}));
                sensorlist.append(newItem);
            }
        }
        sensorlist.listview('refresh');
    });

}
