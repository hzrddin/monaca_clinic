<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db_connect.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($dbPassword);
    $stmt->fetch();

    if ($password === $dbPassword) {
        echo json_encode([
            "status"=>"success",
            "message"=>"Login successful",
            "username" => $username
 ]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Invalid password"]);
    }
} else {
    echo json_encode(["status"=>"error","message"=>"User not found"]);
}

$stmt->close();
$conn->close();
?>
