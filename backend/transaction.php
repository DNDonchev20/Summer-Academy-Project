<?php
require "db.php";

$data = ['status' => "error"];
$user_id = $_GET['user_id']; 

$query="INSERT INTO payments (
    user_id, ends
) VALUES (:user_id, :ends)";
$params = [
':user_id' => $user_id,
':ends' => strval(time()+2678400),
];
$result = $db->query($query, $params);
$data = ['status' => "fine"];
echo json_encode($data);