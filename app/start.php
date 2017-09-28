<?php
	$answer = array();
	include "connect.php";
	$link->query("insert into visits(ip, date) values ('".$_SERVER['REMOTE_ADDR']."','".date('d-m-Y H:i')."')");
	$qw = "select 
			project.id as table_id,
			project.name as table_name,
			task.id as row_id,
			task.name as task_text,
			completed,
			project_id
			from project left outer join task on project_id=project.id;";
	$result = $link->query($qw);
	while( $row = $result->fetch_assoc()){
		array_push($answer,$row);
	}
	echo json_encode($answer);
	$link->close();
