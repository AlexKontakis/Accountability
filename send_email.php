<?php
<<<<<<< HEAD
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer files
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
=======
// Set response type to JSON so JS fetch can parse it
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
>>>>>>> parent of 648eebd (chcek)
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

<<<<<<< HEAD
$inputData = file_get_contents('php://input');
$data = json_decode($inputData, true);

// Honeypot check for bots
if (!empty($data['honeypot'])) {
    echo json_encode(['success' => true]);
    exit;
}

$userEmail = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$userMessage = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$userEmail || empty($userMessage)) {
=======
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
>>>>>>> parent of 648eebd (chcek)
    http_response_code(400);
    echo json_encode(["error" => "Please enter a valid email and message."]);
    exit;
}

<<<<<<< HEAD
$mail = new PHPMailer(true);

try {
    // --- Server & SMTP Configuration ---
    $mail->isSMTP();
    $mail->Host       = 'mail.accountability.gr';     // Pointer SMTP Server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@accountability.gr';     // Your Pointer email account
    $mail->Password   = 'YOUR_EMAIL_PASSWORD_HERE';   // Replace with your real email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // SSL Encryption
    $mail->Port       = 465;                          // Standard SSL Port for Pointer

    // --- Headers & Addresses ---
    // IMPORTANT: From address MUST match the SMTP Username to pass Outlook anti-spoofing checks
    $mail->setFrom('info@accountability.gr', 'Accountability Contact Form');
    
    // Set Reply-To as the customer's email (so clicking Reply in Outlook/Gmail responds to the customer)
    $mail->addReplyTo($userEmail);

    // Form Recipients
    $mail->addAddress('roditi@accountability.gr');
    $mail->addAddress('seretis@accountability.gr');

    // --- Content ---
    $mail->isHTML(false);
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = "You received a new message from your website contact form:\n\n" .
                     "Sender Email: {$userEmail}\n\n" .
                     "Message:\n{$userMessage}\n";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Email dispatch failed. Please try again later.']);
}
=======
// 3. Email parameters
$to = "info@accountability.gr";
$subject = "New Contact Form Message from " . $user_email;

$body = "You have received a new message from your website contact form:\n\n";
$body .= "Sender Email: " . $user_email . "\n";
$body .= "Message:\n" . $user_message . "\n";

// 4. Set Headers
// Must use webmaster/info @ accountability.gr to pass SPF/DKIM checks on cPanel
$headers = "From: info@accountability.gr\r\n";
$headers .= "Cc: seretis@accountability.gr\r\n"; // Added CC header
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
>>>>>>> parent of 648eebd (chcek)
