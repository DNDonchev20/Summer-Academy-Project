<?php
require "../db.php";

$data = ['id' => [], 'category_id' => [], 'title' => [], 'description' => [], 'keywords' => [], 'user_id' => [], 'date' => [], 'views' => [], 'thumbnail' => []];

$category_id = $_GET['category_id'];

$query = "SELECT * FROM courses WHERE category_id = $category_id";

$result = $db->query($query);
if ($result) {
  while ($row = $db->fetchAssoc($result)) {
    //echo $row['title'];
    $data['id'][] = $row['id'];
    $data['category_id'][] = $row['category_id'];
    $data['title'][] = $row['title'];
    $data['description'][] = $row['description'];
    $data['keywords'][] = $row['keywords'];
    $data['date'][] = $row['date'];
    $data['views'][] = $row['views'];
    $data['thumbnail'][] = $row['thumbnail'];
  }
}
echo json_encode($data);
