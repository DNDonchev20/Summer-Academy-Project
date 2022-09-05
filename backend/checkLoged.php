<?php

require "db.php";

$data = ['status' => '', 'username' => '', 'mail' => '', 'admin' => 0];

$webkey = $_GET['webkey'];
$userid = $_GET['userid'];

//$name = "nikitoethebest";
//$userKey = "6339669393";

if($userid == 0 || $userid == null or $webkey == 0 || $webkey == null){
  $data['status'] = 'error';
}else{
  $query = "SELECT * FROM users WHERE user_id = :userid AND web_key = :webkey";
  $params = [
    ':userid' => $userid,
    ':webkey' => $webkey,
  ];

  $result = $db->query($query, $params);
  if ($result) {
    while ($row = $db->fetchAssoc($result)) {
      $data = [
        'status' => 'confirmed',
        'username' => $row['username'],
        'mail' => $row["email"],
        'admin' => $row["role"],
      ];
      echo json_encode($data);
      break;
    }
  }
}

?>