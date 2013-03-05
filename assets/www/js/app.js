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
        this.bindEvents();
        this.fetchSensors();
    },
    cacheElements: function(){
        this.listTemplate = Handlebars.templates.sensor;
        this.viewTemplate = Handlebars.templates.sensorview;
        this.$viewSensorTrippedText = $('#view-sensor-tripped');
        this.$viewSensorTrippedImg = $('#view-sensor-tripped-img');
        this.$viewSensorEnabled = $('#view-sensor-enabled');
        this.$newSensorKey = $('#new-sensor-key');
        this.$newSensorName = $('#new-sensor-name');
        this.$editSensorKey = $('#edit-sensor-key');
        this.$editSensorName = $('#edit-sensor-name');
        this.$sensorList = $('#sensorlist');
        this.$viewWindow = $('#inner-view');
        this.$page = $('#sensorpage');
    },
    bindEvents: function(){
        this.$sensorList.on('vclick', '.view-button', this.viewSensor);
        this.$sensorList.on('vclick', '.edit-gear', this.editSensor);
        this.$page.on('vclick','#refresh-button', this.fetchSensors);
        this.$page.on('submit','#add-sensor-form', this.submitAdd);
        this.$page.on('submit','#edit-sensor-form', this.submitEdit);
        this.$page.on('vclick', '#delete-sensor-button', this.submitDelete);
        this.$page.on('vclick', '#view-sensor-save', this.submitSave);
        this.$page.on('vclick', '#reset-button', this.resetSensor);
        this.$page.on('slidestop', '#view-sensor-enabled', this.enableDisable);
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
            $.getJSON(App.apiURL+'/sensors.json', App.storeSensors);
            $.mobile.loading('hide');
        }
        catch(error){
            alert("Couldn't get the sensor list!"+error);
        }
    },
    refreshSensorList: function(){
        App.$sensorList.empty();
        App.$sensorList.html(App.listTemplate(App.loadSensors()));
        App.$sensorList.listview('refresh');
    },
    refreshSensorView: function(key){
        var sensors = this.loadSensors();
        var sensor = null;
        $.each(sensors, function (i, sens) {
            if (sens.sensor.sensor_id == key) {
                sensor = sens;
            }
        });
        this.$viewWindow.html(this.viewTemplate(sensor)).trigger('create');
    },
    viewSensor: function(){
        var key = $(this).find('p').text();
        App.refreshSensorView(key);
    },
    submitAdd: function(){
        var pushID = "";
        var name = App.$newSensorName.val();
        var id = App.$newSensorKey.val();
        try{
            pushID = window.getAPID.getAPID();
        } catch(err){
            alert("Couldn't get APID!");
            pushID = " ";
        }
        $.ajax({
            type: "POST",
            url: App.apiURL+"/sensors/",
            data: {sensor: { name:name, sensor_id:id, enabled:true, tripped:false, client_apid:pushID }}
        }).done(function() {
                App.$newSensorName.val('');
                App.$newSensorKey.val('');
                App.fetchSensors();
            });
    },
    editSensor: function() {
        var key = $(this).parent().find('p').text();
        App.$editSensorName.val($(this).parent().find('h3').text());
        App.$editSensorKey.val(key);
        App.oldKey = key;
    },
    submitEdit: function(){
        $.ajax({
            type: "PUT",
            url: App.apiURL+"/sensors/"+App.oldKey,
            data: {sensor: { name:App.$editSensorName.val(), sensor_id:App.$editSensorKey.val() }}
        }).done(function() {
                App.fetchSensors();
        });
    },
    submitDelete: function(){
        $.ajax({
            type: "DELETE",
            url: App.apiURL+"/sensors/"+App.oldKey
        }).done(function() {
                App.fetchSensors();
        });
    },
    submitSave: function(){
        var tripped = App.$viewSensorTrippedText.text() == "TRIPPED";
        $.ajax({
            type: "PUT",
            url: App.apiURL+"/sensors/"+$('span.view-sensor-key').text(),
            data: {sensor: { enabled: App.$viewSensorEnabled.val(), tripped: tripped }}
        }).done(function(){
                App.fetchSensors();
        });
    },
    resetSensor: function(){
        if(App.$viewSensorEnabled.val() == 'on'){
            App.$viewSensorTrippedImg.attr('src', 'img/check.png');
            App.$viewSensorTrippedText.text("Ready");
        }
        else{
            App.$viewSensorTrippedImg.attr('src', 'img/disabled.png');
            App.$viewSensorTrippedText.text("Disabled");
        }
    },
    enableDisable: function(){
        if(App.$viewSensorEnabled.val() == 'on'){
            if(App.$viewSensorTrippedText.text() == "TRIPPED"){
                App.$viewSensorTrippedImg.attr('src', 'img/danger.png');
                App.$viewSensorTrippedText.text("TRIPPED");
            }
            else{
                App.$viewSensorTrippedImg.attr('src', 'img/check.png');
                App.$viewSensorTrippedText.text("Ready");
            }
        }
        else {
            App.$viewSensorTrippedImg.attr('src', 'img/disabled.png');
            App.$viewSensorTrippedText.text("Disabled");
        }
    }

};

App.init();

});


