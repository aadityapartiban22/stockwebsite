<?php
// Database connection
$host = "localhost"; // XAMPP default host
$dbname = "login"; // Replace with your database name
$username = "root"; // Default username for XAMPP
$password = ""; // Default password for XAMPP

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_email = $_POST['username'];
    $user_password = $_POST['password'];

    // Query to fetch user details
    $sql = "SELECT * FROM signup WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $user_email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($user_password, $row['password'])) {
            echo "<h3>Login Successful!</h3>";
            // Redirect to dashboard or user page
            header("Location: dashboard.php");
            exit();
        } else {
            echo "<h3>Incorrect password. Please try again.</h3>";
        }
    } else {
        echo "<h3>No user found with this email address.</h3>";
    }

    $stmt->close();
}

$conn->close();
?>
