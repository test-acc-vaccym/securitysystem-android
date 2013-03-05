(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sensor'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <li data-sensorid=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.sensor_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <a class=\"view-button\" href=\"#view\" data-rel=\"popup\" data-transition=\"pop\" data-position-to=\"window\">\n            <img src=\"";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"/>\n            <h3>"
    + escapeExpression(((stack1 = ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n            <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.sensor_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        </a>\n        <a class=\"edit-gear\" href=\"#edit\" data-rel=\"popup\" data-transition=\"pop\" data-position-to=\"window\"></a>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1, stack2;
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.sensor),stack1 == null || stack1 === false ? stack1 : stack1.tripped), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  }
function program3(depth0,data) {
  
  
  return "img/danger.png";
  }

function program5(depth0,data) {
  
  
  return "img/check.png";
  }

function program7(depth0,data) {
  
  
  return "img/disabled.png";
  }

  stack2 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  });
})();