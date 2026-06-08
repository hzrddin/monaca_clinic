<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

//Connect to database (settins are in db_connect.php)
require_once "db_connect.php";

$name = $data["name"] ?? "";
$address = $data["address"] ?? "";
$phone = $data["phone"] ?? "";
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";
$status = "active"; //default status

$stmt = $conn->prepare("INSERT INTO users (name,address,phone, username, password, userStatus) Value (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $address, $phone, $username, $password, $status);

if ($stmt->execute()) {
  $stmt->bind_result($dbPassword);
  $stmt->fetch();

  echo json_encode([
    "status" => "success",
    "message" => "Sign Up Successful"
  ]);
} else {
  echo json_encode([
    "status" => "error",
    "message" => "Sign Up Failed: " . $conn->error
  ]);
}

$stmt->close();
$conn->close();
?>