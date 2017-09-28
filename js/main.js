
//создать таблицу
function add_table(id_table, str){
    $('.main_div').append("<div class='task_div' data-table='"+id_table+"'><div class='task_header'><img src='img/icon.png' alt='icon'><input type='text' class='task_text' value='"+str+"'><button class='btn_del_task'><img src='img/delete.png' alt='delete'></button><span class='cent'>|</span></div><div class='input_div'><img src='img/add-icon.png' alt='add-icon'><div class='input-group input_text'><input type='text' class='form-control form' placeholder='Start typing here to create a task...' aria-describedby='basic-addon2'><span class='input-group-addon add_task'>Add Task</span></div></div><div class='task_list'><table><tbody class='sortContainer'></tbody></table></div></div>");
	
	//переименовываем таблицу
	$(".task_text").change(function(){
		var str = $(this).val();
		var id_table = $($(this).closest(".task_div")).attr('data-table');
		inquiry('edit',id_table,"",str);
	});
};

//клик создать новую таблицу
$(".btn_add_list").click(function(){
	var id_table =  Math.random().toString(36).substr(2,9);
	var str = "Complete the test task";
	add_table(id_table, str);
	inquiry("create_table",id_table,"",str);
});

//создать строку
function add_row(prent, row_id, task_text, completed){
    if(task_text==""){
        task_text="New task...";
    };
	if(completed==1){
		var temp="checked";
	}
	prent.append("<tr class='sortable' data-row='"+row_id+"'><td width='51px' align='center'><input type='checkbox' class='ch' "+temp+"></td><td width='578px'><input type='text' class='task_inp' value='"+task_text+"' disabled></td><td width='98px'><span>\n<span>|</span>\n<button class='edit_task'><img src='img/edit_hover.png' alt='edit'></button>\n<span>|</span>\n<button class='delete_task'><img src='img/delete_hover.png' alt='delete'></button></span></td></tr>");
	if(completed==1){
		$("tr[data-row='"+row_id+"']").find(".task_inp").css("text-decoration","line-through");
	}	
	$( ".sortContainer" ).sortable({cursor: "-webkit-grabbing",
									handle: "td:last-child",
									scroll:true,
									scrollSpeed: 1,
									axis: "y"
								   });
};

//клик создать строку
$(document).on("click", ".add_task", function(){
	var prent = $(this).closest(".task_div").find('tbody');
    var row_id = Math.random().toString(36).substr(2,9);
	var task_text = $(this).siblings("input").val();
	add_row(prent, row_id, task_text, false);
	$(this).siblings("input").val("");
	var id_table = $("tr[data-row='"+row_id+"']").closest(".task_div").attr('data-table');
	var task_text = $("tr[data-row='"+row_id+"']").find(".task_inp").val();
	inquiry("create_row", id_table, row_id, task_text, false);
});

//удалить таблицу
$(document).on("click", ".btn_del_task", function(){
    var id_table =  $($(this).closest(".task_div")).attr('data-table');
	$(this).closest(".task_div").remove();
	inquiry('delete_table',id_table);

});

//checkbox
$(document).on("change",".ch",function(){
	if ($(this).prop('checked')){
       $(this).closest("tr").find(".task_inp").css("text-decoration","line-through");
    }else{
       $(this).closest("tr").find(".task_inp").css("text-decoration","none");
    }
	var id_row = $($(this).closest("tr")).attr('data-row');
	var ch  = $("tr[data-row='"+id_row+"']").find(".ch").prop("checked");
	inquiry("checked","",id_row,"",ch);
});

//кнопка изменить строку
$(document).on("click", ".edit_task", function(){
    var prent = $(this).closest("tr").find(".task_inp");
    prent.attr("disabled",false);
    prent.closest("tr").find(".task_inp").focus();
});

//изменяем строку
$(document).on("change",".task_inp", function(){
    var prent = $(this).closest("tr").find(".task_inp");
    prent.attr("disabled",true);
	var str = $(this).val();
	var id_row = $($(this).closest("tr")).attr('data-row');
	inquiry('edit_row', "", id_row, str);
});

//удалить строку
$(document).on("click",".delete_task", function(){
    $(this).closest("tr").remove();
	var id_row = $($(this).closest("tr")).attr('data-row');
	inquiry("delete_row","",id_row);
});

$(document).on("mouseover","tr", function(){
    $(this).find("span").show();
	$(this).find('td:last-child').css("background-image", "url(/img/up_down_hover.png)");
	$(this).find('td:last-child').css("background-repeat", "no-repeat");
	$(this).find('td:last-child').css("background-position", "20px center");
});

$(document).on("mouseout","tr", function(){
    $(this).find("span").css("display","none");
	$(this).find('td:last-child').attr("style", "");
});

//запрос в php
function inquiry(act, id_table, row_id, task_text, completed){
	$.ajax({
		url: "../app/db.php",
		cache: false,
		type: "GET",
		data:{act:act,
			  id_table:id_table,
			  id_row:row_id,
			  str: task_text,
			  ch: completed
			 }
	});
};