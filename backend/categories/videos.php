<?php
require "../db.php";

$data = ['id' => [], 'course_id' => [], 'title' => [], 'path' => [], 'description' => []];

$course_id = $_GET['course_id'];

$query = "SELECT * FROM lessons WHERE course_id = $course_id";

$result = $db->query($query);
if ($result) {
  while ($row = $db->fetchAssoc($result)) {
    //echo $row['title'];
    $data['id'][] = $row['id'];
    $data['course_id'][] = $row['course_id'];
    $data['title'][] = $row['title'];
    $data['path'][] = $row['path'];
    $data['description'][] = $row['description'];
  }
}
echo json_encode($data);
