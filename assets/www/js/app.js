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

jQuery(function ($) {
var App = {
    init: function(){
        this.apiURL = 'http://securitysystem.herokuapp.com';
        this.oldKey = "";
        this.cacheElements();
        this.fetchSensors();
    },
    cacheElements: function(){
        this.listTemplate = Handlebars.templates.sensor;
        this.viewTemplate = Handlebars.templates.sensorview;
        this.$viewSensorTrippedText = $('#view-sensor-tripped');
        this.$viewSensorTrippedImg = $('#view-sensor-tripped-img');
        this.$viewSensorEnabled = $('#view-sensor-enabled');
        this.$sensorList = $('#sensorlist');
        this.$viewWindow = $('#inner-view');
        this.$page = $('#sensorpage');
    },
    bindEvents: function(){
        this.$sensorList.on('vclick', '.view-button', this.viewSensor);
        $.on('vclick','#refresh-button', this.fetchSensors);
    },
    storeSensors: function (data) {
        localStorage.setItem('ss-sensors', JSON.stringify(data));
        App.refreshSensorList();
    },
    loadSensors: function(){
        var store = localStorage.getItem('ss-sensors');
        return (store && JSON.parse(store)) || [];
    },
    fetchSensors:function(){
        try{
            $.mobile.loading('show');
            $.getJSON(this.apiURL+'/sensors.json', this.storeSensors);
            $.mobile.loading('hide');
        }
        catch(error){
            alert("Couldn't get the sensor list!"+error);
        }
    },
    refreshSensorList: function(){
        this.$sensorList.empty();
        this.$sensorList.html(this.listTemplate(this.loadSensors()));
        this.$sensorList.listview('refresh');
    },
    refreshSensorView: function(key){
        var sensors = this.loadSensors();
        var sensor;
        for(var s in sensors) {
            if(s.sensor_id == key && sensors.hasOwnProperty(s)) {
                sensor = s;
            }
        }
        console.log(s);
        this.$viewWindow.html(this.viewTemplate(sensor)).trigger('create');
    },
    viewSensor: function(){
        var key = $(this).find('p').text();
        this.refreshSensorView(key);
    }

};

App.init();

});




//set sensor information on edit popup
$(document).on('vclick', '.edit-gear', function () {
    var key = $(this).parent().find('p').text();
    var edit = $('#edit');
    edit.find('#edit-sensor-name').val($(this).parent().find('h3').text());
    edit.find('#edit-sensor-key').val(key);
    oldKey = key;
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

