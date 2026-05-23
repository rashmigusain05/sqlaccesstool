# Define parameters
$smtpServer = "smtp.office365.com"  # SMTP server
$smtpPort = 587                     # Common SMTP port
$sender = "automation@caresmartz360.com"  # Sender email address
$recipients = "harman.saini@caresmartz360.com","rashmi.singh@netsmartz.com" # Recipient email addresses
$subject = "Subject of the Email"

# Read the HTML body from the external file
$body = Get-Content -Path "body.txt" -Raw

# Declare username and password variables
$username = "automation@caresmartz360.com"  # Replace with your username
$password = "Yub59805"  # Replace with your password

# Create a secure credential object
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($username, $securePassword)

# Get attachments using a wildcard
$attachmentPath = "*.html" # File path and pattern
$attachments = Get-ChildItem -Path $attachmentPath

# Check if attachments exist and prepare attachment paths
if ($attachments) {
    $attachmentFullPaths = $attachments.FullName
    # Send email with multiple attachments and HTML body
    Send-MailMessage -From $sender -To $recipients -Subject $subject -Body $body -BodyAsHtml -SmtpServer $smtpServer -Port $smtpPort -UseSsl -Attachments $attachmentFullPaths -Credential $credential
} else {
    Write-Host "No attachments found."
}
