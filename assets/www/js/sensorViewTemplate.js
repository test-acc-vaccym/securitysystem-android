(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sensorview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "selected";
  }

function program3(depth0,data) {
  
  var stack1, stack2;
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.tripped), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  }
function program4(depth0,data) {
  
  
  return "img/danger.png";
  }

function program6(depth0,data) {
  
  
  return "img/check.png";
  }

function program8(depth0,data) {
  
  
  return "img/disabled.png";
  }

function program10(depth0,data) {
  
  var stack1, stack2;
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.tripped), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  }
function program11(depth0,data) {
  
  
  return "TRIPPED";
  }

function program13(depth0,data) {
  
  
  return "Ready";
  }

function program15(depth0,data) {
  
  
  return "Disabled";
  }

  buffer += "<h3>Sensor Details:</h3>\n<p>Name: "
    + escapeExpression(((stack1 = ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n<p>Key: <span class=\"view-sensor-key\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.sensor_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></p>\n\n<div class=\"enabled-slider\">\n    <select name=\"flip-min\" id=\"view-sensor-enabled\" data-role=\"slider\" data-theme=\"a\" data-track-theme=\"a\">\n        <option value=\"off\" ";
  stack2 = helpers.unless.call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">Disabled</option>\n        <option value=\"on\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">Enabled</option>\n    </select>\n</div>\n<a id=\"reset-button\" data-role=\"button\">Reset</a>\n\n<img id=\"view-sensor-tripped-img\" src=\"";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},inverse:self.program(8, program8, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" />\n<p id=\"view-sensor-tripped\">";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},inverse:self.program(15, program15, data),fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n\n<div id=\"view-sensor-save-div\">\n    <a id=\"view-sensor-save\" href=\"#\" data-role=\"button\" data-rel=\"back\" data-inline=\"true\">Save</a>\n</div>";
  return buffer;
  });
})();