<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

if (!empty($_POST['website'] ?? '')) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean_field(string $value): string {
    $value = trim(strip_tags($value));
    return str_replace(["\r", "\n", "\0"], '', $value);
}

$name = clean_field((string)($_POST['name'] ?? ''));
$company = clean_field((string)($_POST['company'] ?? ''));
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = clean_field((string)($_POST['phone'] ?? ''));
$service = clean_field((string)($_POST['service'] ?? ''));
$message = trim(strip_tags((string)($_POST['message'] ?? '')));

if ($name === '' || !$email || $phone === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields with a valid email address.']);
    exit;
}

$to = 'lakra@airesrelocations.com.au';
$subject = 'Website enquiry - ' . ($service !== '' ? $service : 'General enquiry');
$body = "A new enquiry was submitted on the Aires Linehaul website.\n\n"
      . "Name: {$name}\n"
      . "Company: " . ($company !== '' ? $company : 'Not provided') . "\n"
      . "Email: {$email}\n"
      . "Phone: {$phone}\n"
      . "Service: " . ($service !== '' ? $service : 'Not provided') . "\n\n"
      . "Movement details:\n{$message}\n";

$host = preg_replace('/[^a-z0-9.-]/i', '', (string)($_SERVER['HTTP_HOST'] ?? 'aireslinehaul.com.au'));
$from = 'website@' . ($host ?: 'aireslinehaul.com.au');
$headers = [
    'From: Aires Linehaul Website <' . $from . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

if (!mail($to, $subject, $body, implode("\r\n", $headers))) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Email could not be sent. Please call or email our team.']);
    exit;
}

echo json_encode(['ok' => true]);
