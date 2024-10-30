package com.techelp.api.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.techelp.api.dtos.EmailDto;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public String enviarEmailSenha(EmailDto user) {
        try {
            String[] nameParts = user.name().split(" ");
            String firstName = nameParts[0];
            String subject = "Requisição de nova senha para " + firstName + "!";
            String novaSenha = NewPasswordService.generateNewRandomPassword();
            String template = loadPasswordTemplateEmail();
            template = template.replace("#{name}", user.name());
            template = template.replace("#{password}", novaSenha);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(remetente);
            helper.setTo(user.email());
            helper.setSubject(subject);
            helper.setText(template, true);

            javaMailSender.send(mimeMessage);

            return "E-mail enviado com sucesso!";
        } catch (MessagingException | IOException e) {
            return "Erro ao enviar e-mail: " + e.getLocalizedMessage();
        }
    }

    private String loadPasswordTemplateEmail() throws IOException {
        ClassPathResource resource = new ClassPathResource("emailTemplates/templateSenha.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
