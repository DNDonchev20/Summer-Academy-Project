<?php
require "../db.php";

$data = ['id' => [], 'title' => []];

$query = "SELECT * FROM categories";

$result = $db->query($query);
if ($result) {
  while ($row = $db->fetchAssoc($result)) {
    //echo $row['title'];
    $data['id'][] = $row['id'];
    $data['title'][] = $row['title'];
  }
}
echo json_encode($data);
