<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer files
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

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
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a valid email and message.']);
    exit;
}

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