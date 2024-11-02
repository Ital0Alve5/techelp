package com.techelp.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.EmailDto;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TempPasswordService tempPasswordService;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendPasswordEmail(EmailDto emailData) throws MessagingException, IOException {
        String newPassword = tempPasswordService.createAndAssociateTempPassword(emailData.email());

        String[] nameParts = emailData.name().split(" ");
        String firstName = nameParts[0];
        String subject = "Requisição de nova senha para " + firstName + "!";
        String template = loadPasswordTemplateEmail();
        template = template.replace("#{name}", emailData.name());
        template = template.replace("#{password}", newPassword);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(sender);
        helper.setTo(emailData.email());
        helper.setSubject(subject);
        helper.setText(template, true);

        javaMailSender.send(mimeMessage);

        return newPassword;
    }

    private String loadPasswordTemplateEmail() throws IOException {
        ClassPathResource resource = new ClassPathResource("emailTemplates/templateSenha.html");
        return new String(resource.getInputStream().readAllBytes());
    }
}
