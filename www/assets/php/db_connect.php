<?php
$servername = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "myclinic";

$conn = new mysqli ($servername, $dbuser, $dbpass, $dbname);

if ($conn -> connect_error) {
  die(json_encode(["status" => "error", "message" => "DB failed: " .$conn->connect_error]));
}
?>