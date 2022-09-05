<?php

require "db.php";

$data = ['status' => '', 'user_key' => '', 'user_id' => ''];

$mail = $_GET['mail'];
$pass = $_GET['pass'];
$pass = md5($pass);

//$name = "nikitoethebest";
//$userKey = "6339669393";

$query = "SELECT * FROM users WHERE email = :mail AND password = :pass";
$params = [
  ':mail' => $mail,
  ':pass' => $pass,
];  

$have = false;

$result = $db->query($query, $params);
if ($result) {
  while ($row = $db->fetchAssoc($result)) {
    $have = true;
    $data = [
      'status' => 'fine',
      'user_key' => $row['web_key'],
      'user_id' => $row["user_id"],
    ];
    echo json_encode($data);
    break;
  }
}

if(!$have){
    $data['status'] = 'noacc';
    echo json_encode($data);
}

?>