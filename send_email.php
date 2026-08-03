<?php
// Set response type to JSON
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Retrieve raw JSON payload
$inputData = file_get_contents('php://input');
$data = json_decode($inputData, true);

// Honeypot check (bot prevention)
if (!empty($data['honeypot'])) {
    // Silent fail for bots
    echo json_encode(['success' => true]);
    exit;
}

// Extract and sanitize input fields
$firstName   = htmlspecialchars(trim($data['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
$lastName    = htmlspecialchars(trim($data['lastName'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone       = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$userEmail   = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$userMessage = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Required fields check (First Name, Last Name, Email, Message)
if (empty($firstName) || empty($lastName) || !$userEmail || empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields and provide a valid email.']);
    exit;
}

// Define Recipients & Email Details
$to = 'roditi@accountability.gr, seretis@accountability.gr';
$subject = 'New Website Contact Form Submission';

$emailBody  = "You have received a new contact form message:\n\n";
$emailBody .= "Name: " . $firstName . " " . $lastName . "\n";
$emailBody .= "Email: " . $userEmail . "\n";
$emailBody .= "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n\n";
$emailBody .= "Message:\n" . $userMessage . "\n";

// Define Email Headers
$headers = [
    'From' => 'no-reply@accountability.gr',
    'Reply-To' => $userEmail,
    'X-Mailer' => 'PHP/' . phpversion()
];

// Send Email
if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}