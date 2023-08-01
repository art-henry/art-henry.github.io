<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $text = $_POST['text'];

  require_once('phpmailer/PHPMailerAutoload.php');
  $mail = new PHPMailer;
  $mail->CharSet = 'utf-8';

  // $mail->SMTPDebug = 3;                               // Enable verbose debug output

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'henrikdevmail@gmail.com';                 // Your email login
  $mail->Password = 'ttyypuvyvnegnaae';                           // Your email password
  $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 465;                                    // TCP port to connect to

  $mail->setFrom('henrikdevmail@gmail.com', 'Portfolio');   // Sender
  $mail->addAddress('henrymkhitaryan1992@gmail.com');     // Recipient
  //$mail->addAddress('ellen@example.com');               // Name is optional
  //$mail->addReplyTo('info@example.com', 'Information');
  //$mail->addCC('cc@example.com');
  //$mail->addBCC('bcc@example.com');
  //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Contact Data';
  $mail->Body = '
    The user left the following data: <br>
    Name: ' . $name . ' <br>
    Email: ' . $email . ' <br>
    Message: ' . $text . '';

  if ($mail->send()) {
    echo "success";
  } else {
    echo "error";
  }
}
?>