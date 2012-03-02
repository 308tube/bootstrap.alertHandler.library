
$(document).ready(function(){
	
	$("#example1_btn").click(function(){
		_BSMsg("example1").errMsg(0).build();
	});
	
	$("#example2a_btn").click(function(){
		_BSMsg("example2a").errMsg(-1).build("slow");
	});
	$("#example2b_btn").click(function(){
		_BSMsg("example2b").errMsg(1).build(3000);
	});
	
	$("#example3a_btn").click(function(){
		_BSMsg("example3a").errMsg({
			display_msg: "This message will be displayed to the user",
			sys_msg: "This is the geek message that will be logged"
		})
		.build("fast");
	});
	$("#example3b_btn").click(function(){
		_BSMsg("example3b").errMsg({
			display_msg: "How now brown cow",
			sys_msg: "var cow=brown, error cow is not brown"
		})
		.build(1000);
	});
	
	$("#example4a_btn").click(function(){
		_BSMsg("example4a").errMsg(0).setColor("blue").build("slow");
	});
	$("#example4b_btn").click(function(){
		_BSMsg("example4b").setColor("red").errMsg(-1).build("fast");
	});
	$("#example4c_btn").click(function(){
		_BSMsg("example4c").errMsg(1).setColor("green").build("slow");
	});
	$("#example4d_btn").click(function(){
		_BSMsg("example4d").errMsg({
			display_msg: "How now brown cow",
			sys_msg: "var cow=brown, error cow is not brown"
		})
		.setColor("yellow")
		.build("fast");
	});
	
	
	$("#example5a_btn").click(function(){
		_BSMsg("example5a").setDisplayTime(0).errMsg(0).setColor("blue").build("fast");
		_BSMsg("example5b").setDisplayTime(3000).setColor("red").errMsg(-1).build("fast");
		_BSMsg("example5c").setDisplayTime(2000).errMsg(1).setColor("green").build("fast");
		_BSMsg("example5d").setDisplayTime(1000)
		.errMsg({
			display_msg: "How now brown cow",
			sys_msg: "var cow=brown, error cow is not brown"
		})
		.setColor("yellow")
		.build("fast");
	});
	
	$("#example6a_btn").click(function(){
		_BSMsg("example6a").setDisplayTime(4000).errMsg(0).setColor("blue").build("fast")
			.setElementID("example6b").setDisplayTime(3000).setColor("red").errMsg(-1).build("fast")
			.setElementID("example6c").setDisplayTime(2000).errMsg(1).setColor("green").build("fast")
			.setElementID("example6d").setDisplayTime(1000)
				.errMsg({
						display_msg: "How now brown cow",
						sys_msg: "var cow=brown, error cow is not brown"
				})
				.setColor("yellow")
				.build("fast");
	});
	
	$("#example7a_btn").click(function(){
		
		//code here to check on pos1 status
		var status_check = _BSMsg("pos1").setDisplayTime(5000).errMsg(2).setColor("green").build("fast");
		
		//code here to check on pos2 status
		status_check.setElementID("pos2").build("fast");
		
		//code here to check on pos3 status
		status_check.setElementID("pos3").errMsg(3).setDisplayTime(0).setColor("yellow").build("fast");
		
		//more code, error found
		status_check.setElementID("pos4").errMsg(-2).setColor("red").build("fast");
		
		//more code, system ready
		status_check.setElementID("pos5").setDisplayTime(5000).errMsg(2).setColor("green").build("fast");
		
		//more code, system ready
		status_check.setElementID("pos6").build("fast"); //reuses values
		
		//more code, system ready
		status_check.setElementID("pos7").build("fast"); //reuses values
		
		//more code, system ready
		status_check.setElementID("pos8").build("fast"); //reuses values
		
		//more code, found error
		status_check.setElementID("pos9").errMsg(-2).setColor("red").setDisplayTime(0).build("fast");
		
		//more code, system not ready
		status_check.setElementID("pos10").errMsg(3).setColor("yellow").build("fast");
		
		//more code, found error
		status_check.setElementID("pos11").errMsg(-2).setColor("red").build("fast");
		
		//more code, system ready
		status_check.setElementID("pos12").errMsg(2).setColor("green").setDisplayTime(5000).build("fast");
	});
	
	$("#example8a_btn").click(function(){
		
		//code here to check on pos1 status
		var green_status = _BSMsg("pos1b").setDisplayTime(5000).errMsg(2).setColor("green").build("fast"); //build green status
		
		//code here to check on pos2 status
		green_status.setElementID("pos2b").build("fast"); //reuses green values
		
		//code here to check on pos3 status
		var yellow_status = _BSMsg("pos3b").errMsg(3).setDisplayTime(0).setColor("yellow").build("fast"); //build yellow status
		
		//more code, error found
		var red_status = _BSMsg("pos4b").errMsg(-2).setColor("red").build("fast"); //build red status
		
		//more code, system ready
		green_status.setElementID("pos5b").build("fast"); //reuses green values
		
		//more code, system ready
		green_status.setElementID("pos6b").build("fast"); //reuses green values
		
		//more code, system ready
		green_status.setElementID("pos7b").build("fast"); //reuses green values
		
		//more code, system ready
		green_status.setElementID("pos8b").build("fast"); //reuses green values
		
		//more code, found error
		red_status.setElementID("pos9b").build("fast"); //reuses red values
		
		//more code, system not ready
		yellow_status.setElementID("pos10b").build("fast"); //reuses yellow values
		
		//more code, found error
		red_status.setElementID("pos11b").build("fast"); //reuses red values
		
		//more code, system ready
		green_status.setElementID("pos12b").build("fast"); //reuses green values
	});
	
});

