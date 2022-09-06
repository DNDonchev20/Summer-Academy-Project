<?php
require "../db.php";

error_reporting(0);

$data = ['id' => [], 'course_id' => [], 'title' => [], 'path' => [], 'description' => [], 'path' => []];

$course_id = $_GET['course_id'];
$userid = $_GET['user_id'];

    $query = "SELECT * FROM payments WHERE user_id = :userid";
      $params = [
        ':userid' => $userid,
      ];

      $ends_in = 0;

      $result = $db->query($query, $params);
      if ($result) {
        while ($roww = $db->fetchAssoc($result)) {
          $ends_in = $roww['ends'];
        }
      }

$query = "SELECT * FROM lessons WHERE course_id = $course_id";

$cnt = 0;

$result = $db->query($query);
if ($result) {
  while ($row = $db->fetchAssoc($result)) {
    //echo $row['title'];
    $data['id'][] = $row['id'];
    $data['course_id'][] = $row['course_id'];
    $data['title'][] = $row['title'];
    $data['description'][] = $row['description'];
    if($cnt > 0){
      if(((int)$ends_in) > time()){
        $data['path'][] = $row['path'];
      }else{
        $data['path'][] = "direct/free.mp4";
        $data['description'][$cnt] .= "<a style='font-weight: bold; text-decoration: none;' href='#paypal-button-container'> | [Закупи абонамент]</a>";
      }
    }else{
      $data['path'][] = $row['path'];
    }
    $cnt = $cnt + 1;
  }
}
echo json_encode($data);
