var h = $( document ).height() -170 + "px";
$(".main_div").css("height",h);
var temp_table_id = "";
$.ajax({
	url: '../app/start.php',
	success: function(answer){
		var answer = jQuery.parseJSON(answer);
		$.each(answer, function(index, value){		
			if(temp_table_id != value.table_id){
				add_table(value.table_id,value.table_name);
			}
			temp_table_id = value.table_id;
			if(value.row_id != null){
				add_row(($("div[data-table='"+value.project_id+"']").find("tbody")), value.row_id, value.task_text, value.completed);
			}			
		})
	}
});
