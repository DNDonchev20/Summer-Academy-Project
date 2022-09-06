<?php
require "db.php";

$data = ['msg' => '', 'data' => []];

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
  if ($row = $db->fetchAssoc($result)) {
    $data['data'] = [
      'user_key' => $row['web_key'],
      'user_id' => $row["user_id"],
    ];
    echo json_encode($data);
	exit;
  }
}

$data['msg'] = 'Грешен имейл или парола';
echo json_encode($data);
