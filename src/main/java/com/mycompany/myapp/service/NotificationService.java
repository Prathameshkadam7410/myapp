//package com.mycompany.myapp.service;
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import org.springframework.mail.MailException;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//
//public class NotificationService {
//
//    private JavaMailSender emailService;
//
//    public NotificationService(JavaMailSender emailService) {
//        this.emailService = emailService;
//    }
//
//    @Scheduled(fixedDelay = 300);
//    public void sendEmail(String from, String to, String cc, String bcc, String subject, String message) {
//        try {
//            MimeMessage mimeMessage = emailService.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
//
//            helper.setFrom(from);
//            helper.setTo(to);
//
//            if (cc != null && !cc.isEmpty()) {
//                helper.setCc(cc);
//            }
//
//            if (bcc != null && !bcc.isEmpty()) {
//                helper.setBcc(bcc);
//            }
//
//            helper.setSubject(subject);
//            helper.setText(message, true);
//
//            emailService.send(mimeMessage);
//            System.out.println("Email sent successfully.");
//        } catch (MessagingException | MailException e) {
//            System.out.println("Failed to send email: " + e.getMessage());
//        }
//    }
//
//    public static void main(String[] args) {
//        // Example usage
//        JavaMailSender MailSender = null;
//        NotificationService notificationService = new NotificationService(null);
//        notificationService.sendEmail("sender@example.com", "recipient@example.com", "cc@example.com", "bcc@example.com", "Test Email", "<html><body><h1>This is a test email.</h1></body></html>");
//    }
//}


package com.mycompany.myapp.service;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.KeyStore;
import java.util.Properties;



@Service
public class NotificationService<to> {

    private JavaMailSender emailService;
    //;
    public NotificationService(JavaMailSender emailService) {
        this.emailService = emailService;
    }

    @Scheduled(fixedDelay = 300000) // 300000 milliseconds = 5 minutes
    public void sendScheduledEmail() {
        String from = "prathamesh.kadam@redberyltech.com";
        String to = "arjun.raj@redberylteh.com";
        String cc = "cc@example.com";
        String bcc = "bcc@example.com";
        String subject = "Test Email";
        String message = "<html><body><h1>This is a test email.</h1></body></html>";

        sendEmail(from, to, cc, bcc, subject, message);
    }

    public  boolean sendEmail(String from, String to, String cc, String bcc, String subject, String message)
    {
        boolean f=false;
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        Session session=Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                String Email = "prathamesh.kadam@redberyltech.com";
                String secretKey = "ifbf qqrb jqkb mvph";
                // or fetch it from globalEmail.getEmail() if such a method exist
                return new PasswordAuthentication(Email, secretKey);
            }
        });
        session.setDebug(true);
        //compose msg[text,media]
        MimeMessage mimeMessage=new MimeMessage(session);

        try
        {
            mimeMessage.setFrom("prathamesh.kadam@redberyltech.com");
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setSubject(subject);
            // mimeMessage.setText(message);
            //send html and text
            mimeMessage.setContent(message,"text/html");
            Transport.send(mimeMessage);
            f=true;

        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return f;
    }
}





