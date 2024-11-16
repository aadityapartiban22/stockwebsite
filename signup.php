<?php
// Database connection
$host = "localhost";
$dbname = "login";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_email = $_POST['email'];
    $user_password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hashing the password

    // Insert user details into the database
    $sql = "INSERT INTO signup (email, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user_email, $user_password);

    if ($stmt->execute()) {
        echo "<h3>Signup Successful!</h3>";
    } else {
        echo "<h3>Error: " . $stmt->error . "</h3>";
    }

    $stmt->close();
}

$conn->close();
?>
