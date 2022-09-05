<?php

error_reporting(0);

require "db.php";

/*
// Create connection
$conn = new mysqli("mysql.bg.cloudlogin.co","angelxz_academy","12345678ll","angelxz_academy");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
*/

// Connection


$name = $_GET['name'];
$mail = $_GET['mail'];
$pass = $_GET['pass'];

//$name = "Никола Андреев";
//$mail = "nikicha4716@abv.bg";
//$phone = "0896604040";
//$pass = "nikola_2008";

$pass = md5($pass);

$userkey = random_int(100000, 999999);
$userId = random_int(100000, 999999);

$data = ['err' => '', 'user_key' => $userkey, 'user_id' => $userId];

$exists = false;
$query="SELECT *
        FROM users
        WHERE email = :email
            OR username = :username";
$params = [
    ':email' => $mail,
    ':username' => $name,
];
$result = $db->query($query, $params);
if ($result) {
    while ($row = $db->fetchAssoc($result)) {
        $exists = true;
        if($name == $row['username']){
            $data['err'] = 'Потребителското име е заето';
            break;
        }else {
            $data['err'] = 'Email-а е зает';
            break;
        }
    }
}

if(!$exists){
    $query="INSERT INTO users (
                username, password, email, web_key, user_id
            ) VALUES (:username, :password, :email, :user_key, :user_id)";
    $params = [
        ':username' => $name,
        ':password' => $pass,
        ':email' => $mail,
        ':user_key' => $userkey,
        ':user_id' => $userId,
    ];
    $result = $db->query($query, $params);

    $data['user_key'] = $userkey;
    $data['user_id'] = $userId;
}

echo json_encode($data);
