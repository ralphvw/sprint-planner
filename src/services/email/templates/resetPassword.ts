export const resetPasswordEmail = (firstName: string, link: string) => `

Hello ${firstName}, 
<br><br>
We've received a request to reset your password for your [Your Company Name] account. To complete the password reset process, please click the link below:
<br><br>
[Reset Password Link](${link})
<br><br>
If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
<br><br>
For security reasons, this link will expire in 1 hour. If you have any questions or need further assistance, please contact our support team at ralphvwilliams@icloud.com 
<br><br>
Thank you for choosing The Sprint Team.
<br><br>
Best regards,
The The Sprint Team`;
