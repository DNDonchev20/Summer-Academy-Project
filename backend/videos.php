<?php
require "db.php";

$target_dir = "../assets/videos/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}
// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 5000000000000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "mp4" && $imageFileType != "wmv" && $imageFileType != "mov"
&& $imageFileType != "avi" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jpg") {
  echo "Sorry, only MP4, WMV, MOV & AVI files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}

$course_id = $_POST['category'];
$title = $_POST['title'];
$description = $_POST['description'];
$path = basename( $_FILES["fileToUpload"]["name"]);


$query="INSERT INTO lessons (
    course_id, title, description, path
) VALUES (:course_id, :title, :description, :path)";
$params = [
':course_id' => $course_id,
':title' => $title,
':description' => $description,
':path' => $path,
];
$result = $db->query($query, $params);
header("Location: http://localhost/akademia/v2.0/video.html");
?>