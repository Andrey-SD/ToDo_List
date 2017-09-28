<?php
	include "connect.php";
	$qw = $_GET[act];
	switch ($_GET[act]){
		case "create_table": $qw = "INSERT INTO project(id,name) VALUES ('".$_GET[id_table]."','".$_GET[str]."');";
			break;
		case "delete_table": $qw = "DELETE FROM project WHERE id='".$_GET[id_table]."';";
			break;
		case "edit": $qw ="UPDATE project SET name='".$_GET[str]."' WHERE id='".$_GET[id_table]."';" ;
			break;
		case "create_row": $qw = "INSERT INTO task(id, name, completed, project_id) VALUES ('".$_GET[id_row]."','".$_GET[str]."',".$_GET[ch].",'".$_GET[id_table]."');";
			break;
		case "edit_row": $qw = "UPDATE task SET name='".$_GET[str]."' WHERE id='".$_GET[id_row]."';";
			break;
		case "delete_row": $qw = "DELETE FROM task WHERE id='".$_GET[id_row]."';";
			break;
		case "checked": $qw = "UPDATE task SET completed=".$_GET[ch]." WHERE id='".$_GET[id_row]."';";
			break;
	};
	$link->query($qw);
	$link->close();