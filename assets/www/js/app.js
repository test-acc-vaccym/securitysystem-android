var sensors;

$(document).on('deviceready', (function () {
    $.getScript('js/PushNotification.js', function () {
        //push notification setup
        var push = window.pushNotification;

        function on_push(data) {
            console.log("Received push: " + data.message);
        }

        function on_reg(error, pushID) {
            if (!error) {
                console.log("Reg Success: " + pushID);
                $('#id').text(pushID);
            }
        }

        push.enablePush();
        push.registerEvent('registration', on_reg);
        push.registerEvent('push', on_push);
    });
}));



//set some defaults before the app loads
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
});

//load sensors from HTML5 local storage
$(document).on('pageinit', '#main', function () {
    sensors = JSON.parse(localStorage.getItem('sensors'));
    if (sensors == null) {
        sensors = [
            ['Example Sensor 1', '9182958135'],
            ['Example Sensor 2', '124091240']
        ];
        window.localStorage.setItem('sensors', JSON.stringify(sensors));
    }
});

//reload the list every time the sensor page is loaded
$(document).on('pagebeforeshow', '#sensorpage', function () {
    reloadSensorList();
});

//reload the list every time a 'save' button is clicked
$(document).on('vclick', '.save-button', function () {
    reloadSensorList();
});

//add new sensor behavior
$(document).on('vclick', '#add-button', function () {
    var name = $('#new-sensor-name');
    var key = $('#new-sensor-key');
    var newsensor = [];
    newsensor[0] = name.val();
    newsensor[1] = key.val();
    sensors.push(newsensor);
    window.localStorage.setItem('sensors', JSON.stringify(sensors));
    reloadSensorList();
    name.val('');
    key.val('');
});

//delete sensor behavior
$(document).on('vclick', '#delete-sensor-button', function () {
    var name = $(this).parent().parent().find('h3').text().substr(5);
    for (var i in sensors) {
        if (sensors.hasOwnProperty(i)) {
            if (sensors[i][0] == name) {
                sensors.splice(i, 1);
                window.localStorage.setItem('sensors', JSON.stringify(sensors));
                reloadSensorList();
            }
        }
    }
});

//set sensor name in edit header
$(document).on('vclick', '.edit-gear', function () {
    $('#edit').find('h3').text('Edit ' + $(this).parent().find('h3').text());
});

function reloadSensorList() {
    var sensorlist = $('#sensorlist');
    sensorlist.empty();
    for (var i in sensors) {
        if (sensors.hasOwnProperty(i)) {
            var newItem = $('<li/>');
            var inner = $('<a/>', {'href': '#'});
            inner.append($('<img/>', {'src': 'img/logo.png'}));
            inner.append($('<h3/>', {'text': sensors[i][0] }));
            inner.append($('<p/>', {'text': sensors[i][1]}));
            newItem.append(inner);
            newItem.append($('<a/>', {'class': 'edit-gear', 'href': '#edit', 'data-rel': 'popup', 'data-transition': 'pop', 'data-position-to': 'window'}));
            sensorlist.append(newItem).listview('refresh');
        }
    }
}


