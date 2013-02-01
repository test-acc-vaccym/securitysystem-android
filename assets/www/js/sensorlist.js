$(document).on('pagebeforeshow','#sensorpage',function(){
        alert('Updating Sensor List...');
        var newItem = $('<li/>');
        var inner = $('<a/>', {'href': '#'});
        inner.append($('<img/>', {'src':'img/logo.png'}));
        inner.append($('<h3/>', {'text':'Sensor Name'}));
        inner.append($('<p/>', {'text':'Sensor Code'}));
        newItem.append(inner);
        newItem.append($('<a/>', {'href': '#edit', 'data-rel':'popup', 'data-transition':'pop', 'data-position-to':'window'}));
        $('#sensorlist').append(newItem).listview('refresh');
});
