<?php
// Set response type to JSON so JS fetch can parse it
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Read raw JSON input sent from the JS fetch request
$input = json_decode(file_get_contents('php://input'), true);

$user_email = filter_var(trim($input["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$user_message = trim($input["message"] ?? '');
$honeypot = trim($input["honeypot"] ?? '');

// 1. Anti-spam honeypot check
if (!empty($honeypot)) {
    // Silent success for spam bots
    echo json_encode(["status" => "Message sent successfully!"]);
    exit;
}

// 2. Validate input
if (!filter_var($user_email, FILTER_VALIDATE_EMAIL) || empty($user_message)) {
    http_response_code(400);
    echo json_encode(["error" => "Please enter a valid email and message."]);
    exit;
}

// 3. Email parameters
$to = "info@accountability.gr";
$subject = "New Contact Form Message from " . $user_email;

$body = "You have received a new message from your website contact form:\n\n";
$body .= "Sender Email: " . $user_email . "\n";
$body .= "Message:\n" . $user_message . "\n";

// 4. Set Headers
// Must use webmaster/info @ accountability.gr to pass SPF/DKIM checks on cPanel
$headers = "From: info@accountability.gr\r\n";
$headers .= "Reply-To: " . $user_email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 5. Send via PHP's native mail engine
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "Message sent successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Server error. Could not send message."]);
}
?>