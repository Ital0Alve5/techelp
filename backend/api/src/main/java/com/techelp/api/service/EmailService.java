package com.techelp.api.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.EmailDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse1;
import com.techelp.api.dto.response.SuccessResponse;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Map;
import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public ResponseEntity<ApiResponse> sendPasswordEmail(EmailDto user) {
        try {
            String[] nameParts = user.name().split(" ");
            String firstName = nameParts[0];
            String subject = "Requisição de nova senha para " + firstName + "!";
            String newPassword = NewPasswordService.generateNewRandomPassword();
            String template = loadPasswordTemplateEmail();
            template = template.replace("#{name}", user.name());
            template = template.replace("#{password}", newPassword);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(sender);
            helper.setTo(user.email());
            helper.setSubject(subject);
            helper.setText(template, true);

            javaMailSender.send(mimeMessage);

            @SuppressWarnings("rawtypes")
            SuccessResponse successResponse = new SuccessResponse<>(HttpStatus.CREATED.value(),
                    "E-mail enviado com sucesso!", Optional.empty());
            return ResponseEntity.status(HttpStatus.CREATED.value()).body(successResponse);
        } catch (MessagingException | IOException e) {
            ErrorResponse1 errorResponse = new ErrorResponse1("Erro de serviço", HttpStatus.BAD_REQUEST.value(),
                    Map.of(
                            "emailSender", "Erro ao enviar e-mail!"));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    private String loadPasswordTemplateEmail() throws IOException {
        ClassPathResource resource = new ClassPathResource("emailTemplates/templateSenha.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
