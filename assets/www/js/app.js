var sensors = null;

$(document).on('pageinit','#main',function(){
    sensors = JSON.parse(localStorage.getItem('sensors'));
    if(sensors == null){
        sensors = [['Example Sensor 1','9182958135'],['Example Sensor 2','124091240']];
        window.localStorage.setItem('sensors',JSON.stringify(sensors));
    }
});

$(document).on('pagebeforeshow','#sensorpage',function(){
    alert('Updating Sensor List...');
    $('#sensorlist').empty();
    for(var i in sensors){
        if(sensors.hasOwnProperty(i)){
            var newItem = $('<li/>');
            var inner = $('<a/>', {'href': '#'});
            inner.append($('<img/>', {'src':'img/logo.png'}));
            inner.append($('<h3/>', {'text': sensors[i][0] }));
            inner.append($('<p/>', {'text': sensors[i][1]}));
            newItem.append(inner);
            newItem.append($('<a/>', {'href': '#edit', 'data-rel':'popup', 'data-transition':'pop', 'data-position-to':'window'}));
            $('#sensorlist').append(newItem).listview('refresh');
        }
    }

});
