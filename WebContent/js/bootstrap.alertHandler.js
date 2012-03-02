/*
 * Alert Library for Bootstrap
 * version: 0.07.10 (2011-FEB-26)
 * http://www.308tube.com/bootstrap/
 * 308tube@gmail.com
 * 
 * Requires:
 * 1. Bootstrap 2.0
 * 2. jQuery
 * 3. bootstrap.alertHandler.js
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK."
 * 
 * Helpful reads:
 * http://en.wikipedia.org/wiki/Fluent_interface#JavaScript
 * http://stackoverflow.com/questions/5370538/best-way-to-implement-javascript-chaining-in-a-library
 * http://stackoverflow.com/questions/4142554/calling-function-within-prototype-object
 */

/**
 * This is the Msg Code Library
 * You can add your own messages into this object and
 * use the key to retrieve the code.
 * 
 * Function returns a array of messages to BSMsg.
 * 
 * @returns {Array} returns object that contains message strings
 */
function _bootstrap_alert_msg_library()
{
	//return array of objects
	return [
		{
	       	key: 0, //key is stored as a numeric message
	       	display_msg: "This is the message displayed to the users",
	       	sys_msg: "This is the message that will be sent up to the logging service"
		},
		{
	       	key: -1, 
	       	display_msg: "A negative numeric number signify a error message",
	       	sys_msg: "All negative numbers are error messages. This allows the developer" +
	       			"to quickly understand if a message is good or bad."
		},
		{
	       	key: 1, 
	       	display_msg: "A positive numeric number signify a warning or positive message",
	       	sys_msg: "All positive numbers are for warning and positive messages. This allows " +
	       			"the developer to quickly understand if a message is good or bad."
		},
		{
	       	key: 2, 
	       	display_msg: "Ready",
	       	sys_msg: "All system report ready"
		},
		{
	       	key: -2, 
	       	display_msg: "Error",
	       	sys_msg: "System not ready"
		},
		{
	       	key: 3, 
	       	display_msg: "Starting",
	       	sys_msg: "System is starting up, not currently ready"
		}
	];
}


/**
 * Constructor function to create a instance of our function
 * that will handle the creation of our alert messages.
 * 
 * @param elementID is the element ID that this function will write to.
 * @returns this (pointer)
 */
function _BSMsg(elementID) 
{
	try
	{
		if (!(this instanceof _BSMsg)) {
			return new _BSMsg(elementID);
		}
		
		this.internalErr = false; //parameter used to check if a error has happened
		this.setElementID(elementID); //valid ID and <div> tag
		
		this.msgBlockStyle = false; //Bootstrap style alert-block set to false, not used
		this.msgColor = "yellow"; //default color if one is not specified
		return this;
	}
	catch(err)
	{
		this.internalErrorHandling(err);
		return this;
	}
}
_BSMsg.prototype = {
	/**
	 * call this method to set the <div> ID element/tag you want to work
	 * with for your alert box.  This method will validate if the elementID
	 * parameter is a ID attribute and its a <div> tag.
	 * 
	 * @param elementID - ID of <div> tag/element
	 * @returns {_BSMsg} - this pointer
	 */
	setElementID: function(elementID) {
		try
		{
			var err;
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "setElementID.internalError";
				err.message = "internalError, setElementID function did not execute";
				throw err;
			}
			
			var $elementID = $("#"+elementID);
			
			/*
			 * Validates that the elementID is a id attribute
			 * Currently no other jquery selector will be supported.
			 */
			if ( $elementID.length ) {
				
				this.elementID = elementID;
				
				/*
				 * Per Bootstrap standards 
				 * http://twitter.github.com/bootstrap/components.html#alerts
				 * Alerts must be defined in a <div> tag.
				 */
				if ( $elementID.is("div") == false ) {
					err = new Error();
					err.name = "element_not_a_div";
					err.message = "Per Bootstrap standards, Alerts must be defined in a div tag";
					throw err;
				}
			}
			else {
				err = new Error();
				err.name = "not_a_ID";
				err.message = "The parameter is not a valid element ID attribute";
				throw err;
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}
	},
	/**
	 * call this method to either retrieve the message you want to use
	 * from the Msg Code Library or you can define your own by passing
	 * in a object.
	 * 
	 * If you are passing in a object display_msg and sys_msg are 
	 * required keys.
	 * 
	 * @param val - number or object
	 * @returns {_BSMsg} - this pointer
	 */
	errMsg: function(val) {
		try
		{
			var err; 
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "errMsg.internalError.1";
				err.message = "internalError, errMsg function did not execute";
				throw err;
			}
			
			if (typeof val === 'number') {
				this.getErrorCode(val);
				
				//since there was a method call above, we need to check for error
				if (this.internalErr == true) {
					err = new Error();
					err.name = "errMsg.internalError.2";
					err.message = "internalError, errMsg function did not execute";
					throw err;
				}
				
				if (typeof this.libraryAlertCode === 'undefined'){
					err = new Error();
					err.name = "no_value_found";
					err.message = "Error Code not found in system library";
					throw err;
				}
			}
			else {
				if (typeof val === 'object') {
					
					var val1 = false;
					var val2 = false;
					
					this.libraryAlertCode = {
						key: null,
						display_msg: null,
						sys_msg: null
					};
					
					if (typeof val.display_msg === 'string'){
						val1 =  true;
						this.libraryAlertCode.display_msg = val.display_msg;
					}
					
					if (typeof val.sys_msg === 'string'){
						val2 =  true;
						this.libraryAlertCode.sys_msg = val.sys_msg;
					}
					
					if (val1 == false && val2 == false){
						err = new Error();
						err.name = "incorrect_libraryErrCode";
						err.message = "Error reading your custom errMsg parameter";
						throw err;
					}
				}
				else {
					err = new Error();
					err.name = "val_not_recongized";
					err.message = "The parameter is not a number or object";
					throw err;
				}
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}
	},
	/**
	 * call this method to retrieve the alert message that you
	 * want to use from the Msg Code Library.
	 * 
	 * @param errorNumber - a number used for lookup
	 * @returns {_BSMsg} - this pointer
	 */
	getErrorCode: function(errorNumber) {
		try
		{
			var err; 
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "getErrorCode.internalError";
				err.message = "internalError, getErrorCode function did not execute";
				throw err;
			}
			
			if (typeof errorNumber === 'number') {
				
				var alert_msg_library = _bootstrap_alert_msg_library();
				var counter = alert_msg_library.length - 1;			
				
				for (var i = 0; i <= counter; i++){
					if (alert_msg_library[i].key == errorNumber){
						this.libraryAlertCode = alert_msg_library[i];
					}
				}
			}
			else {
				
				err = new Error();
				err.name = "not_a_error_number";
				err.message = "Parameter must be a number";
				throw err;
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}  
	},
	/**
	 * call this method to set the color you want your alert
	 * box to have.  Only 4 colors are allowed: yellow, green,
	 * red, blue.
	 * 
	 * @param color - yellow, green, red or blue
	 * @returns {_BSMsg} - this pointer
	 */
	setColor: function(color) {
		try
		{
			var err;
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "setColor.internalError";
				err.message = "internalError, setColor function did not execute";
				throw err;
			}
			
			if (typeof color !== 'string') {
				err = new Error();
				err.name = "not_a_valid_color.1";
				err.message = "There must be a string parameter. Values can be red or blue or yellow or green (case sensitive)";
				throw err;
			}
			else {
				
				var trim_color = jQuery.trim(color);
				
				//value must be red, blue, yellow or green
				if ( trim_color == "red" ||
					 trim_color == "blue" ||
					 trim_color == "green" ||
					 trim_color == "yellow" ) 
				{	
					this.msgColor = trim_color;
				}
				else 
				{
					err = new Error();
					err.name = "not_a_valid_color.2";
					err.message = "There must be a string parameter. Values can be red or blue or yellow or green (case sensitive)";
					throw err;
				}
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}
	},
	/**
	 * call this method to set the amount of time you
	 * want the alert box to be displayed to the user.
	 * 1000 = 1 second.
	 * 
	 * @param delayTime - number - 1000 = 1 second
	 * @returns {_BSMsg} - this pointer
	 */
	setDisplayTime: function(delayTime) {
		try
		{
			var err;
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "setDisplayTime.internalError";
				err.message = "internalError, setDisplayTime function did not execute";
				throw err;
			}
			
			if (typeof delayTime === 'number') {
				this.DisplayTimeValue = delayTime;
			}
			else {
				err = new Error();
				err.name = "not_a_number";
				err.message = "Parameter must be a number";
				throw err;
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}
	},
	/**
	 * call this method when you are ready to build your
	 * alert box. The errMsg method MUST have been called
	 * prior to build.  The time parameter is used to tell
	 * the method how quickly the alert box will build.
	 * 
	 * time is a parameter that can accept a number or string.
	 * String values can be: "fast" or "slow";
	 * number values - 1000 = 1 second;
	 * if you do not pass in a value, then alert box will 
	 * instantly appear.
	 * 
	 * @param time - number or string or "leave empty"
	 * @returns {_BSMsg} - this pointer
	 */
	build: function(time) {
		try
		{
			var err;
			
			if (this.internalErr == true) {
				err = new Error();
				err.name = "build.internalError";
				err.message = "internalError, build function did not execute";
				throw err;
			}
			
			var val1 = false;
			var val2 = false;
			
			if (typeof this.libraryAlertCode === 'object'){
				
				var display_msg_str = null;
				var sys_msg_str = null;
				
				if (typeof this.libraryAlertCode.display_msg === 'string'){
					val1 =  true;
					display_msg_str = this.libraryAlertCode.display_msg;
					
				}
				if (typeof this.libraryAlertCode.sys_msg === 'string'){
					val2 =  true;
					sys_msg_str = this.libraryAlertCode.sys_msg;
				}
				if (val1 == false && val2 == false){
					err = new Error();
					err.name = "can_not_read_errMsg";
					err.message = "Error reading errMsg parameter";
					throw err;
				}
				if (val1 == false) {
					display_msg_str = sys_msg_str;
				}
				
				var $ID = $("#"+this.elementID); //create jquery selector
				var added_class = false;
				var whatColor = this.msgColor;
				var msg_string = null;
				var displayTime = null;
				
				if (typeof this.DisplayTimeValue === 'number'){
					displayTime = this.DisplayTimeValue;
				}
				
				if ( $ID.is(":visible") == true ){
					$ID.hide(); //alert("hide");
				}
				
				if ( $ID.hasClass("alert") == false ){
					$ID.addClass("alert");
				}
				if ( this.msgBlockStyle == true ) {
					if ( $ID.hasClass("alert-block") == false ){
						$ID.addClass("alert-block");
					}
				}
				if ( $ID.hasClass("alert-error") == true ){
					if (whatColor == "red") {
						added_class = true;
					}
					else {
						$ID.removeClass("alert-error");
					}
				}
				if ( $ID.hasClass("alert-success") == true ){
					if (whatColor == "green") {
						added_class = true;
					}
					else {
						$ID.removeClass("alert-success");
					}
				}
				if ( $ID.hasClass("alert-info") == true ){
					if (whatColor == "blue") {
						added_class = true;
					}
					else {
						$ID.removeClass("alert-info");
					}
				}
				if ( added_class == false ) {
					
					switch(whatColor)
					{
					case "red":
						$ID.addClass("alert-error");
						break;
					case "green":
						$ID.addClass("alert-success");
						break;
					case "blue":
						$ID.addClass("alert-info");
						break;
					}
				}
				
				//http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
				var makeid = function(){
					var text = "";
				    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				    for( var i=0; i < 10; i++ )
				        text += possible.charAt(Math.floor(Math.random() * possible.length));

				    return text;
				};
				var random_id = makeid(); //alert(random_id);
				
				msg_string = '<a class="close" id="'+random_id+'">x</a>'+display_msg_str;
				
				if (typeof time === 'number' || time == "slow" || time == "fast"){
					$ID.html(msg_string).show(time);
				}
				else {
					$ID.html(msg_string).show();
				}
				
				if (displayTime != null){
					if (displayTime != 0){
						window.setTimeout(function(){
							$ID.hide();
						}, displayTime);
					}					
				}
				
				//http://stackoverflow.com/questions/1386942/jquery-unbinding-is-it-necessary-replacing-elements
				$("#"+random_id).click(function(){
					$ID.hide();
				});
			}
			else {
				err = new Error();
				err.name = "libraryErrCode_not_defined";
				err.message = "Error, no errMsg has been defined";
				throw err;
			}
			
			return this;
		}
		catch(err)
		{
			this.internalErrorHandling(err);
			return this;
		}
	},
	/**
	 * this method is used internally to report errors. Developer
	 * should never have to call this method
	 * 
	 * @param errCode - string or object
	 * @returns {_BSMsg} - this pointer
	 */
	internalErrorHandling: function(errCode) {
		try
		{
			this.internalErr = true;
			this.errName = errCode.name; //used for QUnit testing
			this.errMessage = errCode.message; //used for QUnit testing
			
			var hasConsole = null;
			
			if (typeof console === 'undefined') { hasConsole = false; }
			else { hasConsole = true; }
			
			var build_error = function(msg, bConsole) {
				if(bConsole == false) { alert(msg.message); }
				else { console.error(msg.name + ": " + msg.message); }
			};
			
			build_error(errCode, hasConsole);
			
			return this;
		}
		catch(err)
		{
			this.internalErr = true;
			alert(err.name + " " + err.message);
			return this;
		}
	}
}; 


/*
template: function(val) { 
	try
	{
		if (this.internalErr == true) {
			throw "_method_.internalError";
		}
		
		return this;
	}
	catch(err)
	{
		this.internalErrorHandling(err);
		return this;
	}
}
*/

/*
if(typeof this.libraryAlertCode === 'object'){
	var errObj = this.libraryAlertCode;
	if(errObj.key == errorNumber){
		//alert("same error code");
		return this;
	}
}
*/

/*
 * http://stackoverflow.com/questions/1386942/jquery-unbinding-is-it-necessary-replacing-elements
 * If the answer is true, then i dont need to unbind the previous click listener
 
var getRandom_id = $ID.attr("random_id"); //alert(getRandom_id);

if(getRandom_id !== undefined){
	//alert( $("#"+getRandom_id).size() );
	$("#"+getRandom_id).unbind('click');
}

$ID.unbind('click'); //unbind all click events on div

//$ID.attr("random_id", random_id);
 */

/*
switch(errCode.name)
{
case "not_a_ID":
	build_error("The parameter is not a valid element ID attribute", hasConsole);
	break;
case "element_not_a_div":
	build_error("Per Bootstrap standards, Alerts must be defined in a div tag", hasConsole);
	break;
case "errMsg.internalError":
	build_error("internalError, errMsg function did not execute", hasConsole);
	break;
case "setColor.internalError":
	build_error("internalError, setColor function did not execute", hasConsole);
	break;
case "setDisplayTime.internalError":
	build_error("internalError, setDisplayTime function did not execute", hasConsole);
	break;
case "build.internalError":
	build_error("internalError, build function did not execute", hasConsole);
	break;
case "val_not_recongized":
	build_error("The parameter is not a number or object", hasConsole);
	break;
case "no_value_found":
	build_error("Error Code not found in system library", hasConsole);
	break;
case "incorrect_libraryErrCode":
	build_error("Error reading your custom errMsg parameter", hasConsole);
	break;
case "libraryErrCode_not_defined":
	build_error("Error, no errMsg has been defined", hasConsole);
	break;
case "can_not_read_errMsg":
	build_error("Error reading errMsg parameter", hasConsole);
	break;
case "not_a_valid_color":
	build_error("There must be a string parameter. Values can be red or blue or yellow or green (case sensitive)", hasConsole);
	break;
case "not_a_number":
	build_error("Parameter must be a number", hasConsole);
	break;
default:
	var default_error = errCode.name + " " + errCode.message;
	build_error(default_error, hasConsole);
}
*/