/**
 * QUnit test script for bootstrap.alertHandler.js 
 */
$(document).ready(function(){
	
	/* Module A - Testing base function
	 * ***********************************************************************/
	module("Module A - _BSMsg"); //name of the section  
	test("Validate initial construction of _BSMsg", function() //Name of the test and call back function
	{  
		expect(5); //how many assertions we expect to test
		
		var hold_msg = _BSMsg("testDiv");
		
		/*
		 * Test 1: test to see if hold_msg is a instance of _BSMsg
		 */
		var bInstance = (hold_msg instanceof _BSMsg);
		
		equal(bInstance, true, 'Test to see if _BSMsg instantiated correctly, results is: '+ bInstance);
		
		/*
		 * Test 2: test to see if hold_msg selecto is testDiv
		 */
		var elementID = hold_msg.elementID;
		var div = "testDiv";
		
		equal(elementID, div, 'Test to see if testDiv was saved as the selector, results is: ' + elementID);
		
		/*
		 * Test 3: Check to see if msgBlockStyle is set to either true or false
		 */
		var test3 = null;
		var msgBlockStyle = hold_msg.msgBlockStyle;
		
		if (msgBlockStyle == false || msgBlockStyle == true) {
			test3 = true;
		}
		equal(test3, true, 'Test to make sure msgBlockStyle is either a true or false value, msgBlockStyle is set to: '+ msgBlockStyle);
		
		/*
		 * Test 4: Check to see if msgColor is set to yellow
		 * Default should be yellow
		 */
		var msgColor = hold_msg.msgColor;
		
		equal(msgColor, "yellow", 'The default color should be yellow, msgColor is set to: '+ msgColor);
		
		/*
		 * Test 5: Check to see if internalErr is set to false
		 * Default is false
		 */
		var internalErr = hold_msg.internalErr;
		
		equal(internalErr, false, 'internalErr should be set to false, internalErr is set to: '+ internalErr);
	});
	
	
	test("Validate div ID error catching", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testP");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "element_not_a_div", 'errName should be: element_not_a_div, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "Per Bootstrap standards, Alerts must be defined in a div tag", 'errMessage should be: Per Bootstrap standards, Alerts must be defined in a div tag, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error catching when the parameter is not a ID attribute", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testClass");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "not_a_ID", 'errName should be: not_a_ID, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "The parameter is not a valid element ID attribute", 'errMessage should be: The parameter is not a valid element ID attribute, errMessage is set to: '+ errMessage);
			
	});
	
	/* Module B - Testing setElementID method
	 * ***********************************************************************/
	module("Module B - setElementID"); //name of the section  
	test("Successful use of setElementID", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").setElementID("testDiv2");
		var elementID = hold_msg.elementID;
		var div = "testDiv2";
		
		/*
		 * Test 1: check to make sure you can use setElementID to select another <div> tag
		 */
		equal(elementID, div, 'Test to see if testDiv2 was saved as the selector, results is: ' + elementID);
		
	});
	
	test("Validate div ID error catching using setElementID method", function() 
	{
		expect(3);
		
		var hold_msg = _BSMsg("testDiv");
		
		/*
		 * Test 1: test to see if hold_msg is a instance of _BSMsg
		 */
		var bInstance = (hold_msg instanceof _BSMsg);
		
		equal(bInstance, true, 'Test to see if _BSMsg instantiated correctly, results is: '+ bInstance);
		
		hold_msg.setElementID("testP");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 2: Check error name
		 */
		equal(errName, "element_not_a_div", 'errName should be: element_not_a_div, errName is set to: '+ errName);
		
		/*
		 * Test 3: Check error message
		 */
		equal(errMessage, "Per Bootstrap standards, Alerts must be defined in a div tag", 'errMessage should be: Per Bootstrap standards, Alerts must be defined in a div tag, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error catching when the parameter is not a ID attribute", function() 
	{
		expect(3);
				
		var hold_msg = _BSMsg("testDiv");
		
		/*
		 * Test 1: test to see if hold_msg is a instance of _BSMsg
		 */
		var bInstance = (hold_msg instanceof _BSMsg);
		
		equal(bInstance, true, 'Test to see if _BSMsg instantiated correctly, results is: '+ bInstance);
		
		hold_msg.setElementID("testClass");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 2: Check error name
		 */
		equal(errName, "not_a_ID", 'errName should be: not_a_ID, errName is set to: '+ errName);
		
		/*
		 * Test 3: Check error message
		 */
		equal(errMessage, "The parameter is not a valid element ID attribute", 'errMessage should be: The parameter is not a valid element ID attribute, errMessage is set to: '+ errMessage);
			
	});
	
	/* Module C - Testing errMsg method
	 * ***********************************************************************/
	module("Module C - errMsg"); //name of the section
	test("Successful use of errMsg method", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").errMsg(0);
		var libObj = hold_msg.libraryAlertCode;
		var testObj = {
			key: 0, //key is stored as a numeric message
			display_msg: "This is the message displayed to the users",
			sys_msg: "This is the message that will be sent up to the logging service"
		};
		
		deepEqual(libObj, testObj, 'Retrieve Library Alert Code and saved libraryAlertCode');
		
	});
	
	test("Successful use of errMsg with custom message. display_msg only", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").errMsg({
			display_msg: "This is a test of the of display_msg",
			sys_msg: null
		});
		var libObj = hold_msg.libraryAlertCode;
		
		var testObj = {
			key: null,
			display_msg: "This is a test of the of display_msg",
			sys_msg: null
		};
		
		deepEqual(libObj, testObj, 'Custom message, display_msg only');
		
	});
	
	test("Successful use of errMsg with custom message. sys_msg only", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").errMsg({
			display_msg: null,
			sys_msg: "This is a test of the of sys_msg"
		});
		var libObj = hold_msg.libraryAlertCode;
		
		var testObj = {
			key: null,
			display_msg: null,
			sys_msg: "This is a test of the of sys_msg"
		};
		
		deepEqual(libObj, testObj, 'Custom message, sys_msg only');
		
	});
	
	test("Successful use of errMsg with custom message. Both display_msg and sys_msg", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").errMsg({
			display_msg: "This is a test of the of display_msg",
			sys_msg: "This is a test of the of sys_msg"
		});
		var libObj = hold_msg.libraryAlertCode;
		
		var testObj = {
			key: null,
			display_msg: "This is a test of the of display_msg",
			sys_msg: "This is a test of the of sys_msg"
		};
		
		deepEqual(libObj, testObj, 'Custom message, display_msg and sys_msg');
		
	});
	
	test("Validate that errMsg method will not run if a method before this method errored out", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testClass").errMsg(0);
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "errMsg.internalError.1", 'errName should be: errMsg.internalError.1, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "internalError, errMsg function did not execute", 'errMessage should be: internalError, errMsg function did not execute, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error when errMsg could not find parameter in the Msg Code Library", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testDiv").errMsg(100);
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "no_value_found", 'errName should be: no_value_found, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "Error Code not found in system library", 'errMessage should be: Error Code not found in system library, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error when passing in a invalid parameter (string)", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testDiv").errMsg("test");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "val_not_recongized", 'errName should be: val_not_recongized, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "The parameter is not a number or object", 'errMessage should be: The parameter is not a number or object, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error when passing in a invalid parameter (object)", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testDiv").errMsg({});
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "incorrect_libraryErrCode", 'errName should be: incorrect_libraryErrCode, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "Error reading your custom errMsg parameter", 'errMessage should be: Error reading your custom errMsg parameter, errMessage is set to: '+ errMessage);
		
	});
	
	/* Module D - Testing getErrorCode method
	 * ***********************************************************************/
	module("Module D - getErrorCode"); //name of the section
	test("Successful use of getErrorCode method", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").getErrorCode(1);
		var libObj = hold_msg.libraryAlertCode;
		var testObj = {
			key: 1, 
			display_msg: "A positive numeric number signify a warning or positive message",
			sys_msg: "All positive numbers are for warning and positive messages. This allows " +
				"the developer to quickly understand if a message is good or bad."
		};
		
		deepEqual(libObj, testObj, 'Retrieve Library Alert Code and saved libraryAlertCode');
		
	});
	
	test("Validate error when getErrorCode could not find parameter in the Msg Code Library", function() 
	{
		expect(1);
		
		var hold_msg = _BSMsg("testDiv").getErrorCode(100);
		var libObj = hold_msg.libraryAlertCode;
		
		/*
		 * Test 1: Check error name
		 */
		equal(libObj, undefined, 'errName should be: no_value_found, errName is set to: '+ libObj);
		
	});
	
	test("Validate that getErrorCode method will not run if a method before this method errored out", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testClass").getErrorCode(0);
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "getErrorCode.internalError", 'errName should be: getErrorCode.internalError, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "internalError, getErrorCode function did not execute", 'errMessage should be: internalError, getErrorCode function did not execute, errMessage is set to: '+ errMessage);
		
	});
	
	test("Validate error when passing in a invalid parameter (string)", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testDiv").getErrorCode("test");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "not_a_error_number", 'errName should be: not_a_error_number, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "Parameter must be a number", 'errMessage should be: Parameter must be a number, errMessage is set to: '+ errMessage);
		
	});
	
	/* Module E - Testing setColor method
	 * ***********************************************************************/
	module("Module E - setColor"); //name of the section
	test("Successful use of setColor method", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testDiv").getErrorCode(1).setColor("green");
		var internalErr = hold_msg.internalErr;
		var msgColor = hold_msg.msgColor;
				
		equal(internalErr, false, 'internalErr should be: false, internalErr is set to: '+ internalErr);
		
		equal(msgColor, "green", 'msgColor should be: green, msgColor is set to: '+ msgColor);
		
	});
	
	test("Validate that errMsg method will not run if a method before this method errored out", function() 
	{
		expect(2);
		
		var hold_msg = _BSMsg("testClass").setColor("green");
		var errName = hold_msg.errName;
		var errMessage = hold_msg.errMessage;
		
		/*
		 * Test 1: Check error name
		 */
		equal(errName, "setColor.internalError", 'errName should be: setColor.internalError, errName is set to: '+ errName);
		
		/*
		 * Test 2: Check error message
		 */
		equal(errMessage, "internalError, setColor function did not execute", 'errMessage should be: internalError, setColor function did not execute, errMessage is set to: '+ errMessage);
		
	});
	
	
	
});

