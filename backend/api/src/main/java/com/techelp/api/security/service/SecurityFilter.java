package com.techelp.api.security.service;

import com.techelp.api.model.ClientModel;
import com.techelp.api.model.EmployeeModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.repository.EmployeeRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String token = recoverToken(request);

        if (token != null) {
            String loginEmail = jwtTokenService.validateTokenAndRetrieveSubject(token);

            if (loginEmail != null) {
                String userType = jwtTokenService.getUserTypeFromToken(token);

                if ("client".equals(userType)) {
                    ClientModel client = clientRepository.findByEmail(loginEmail)
                            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
                    var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_CLIENT"));
                    var authentication = new UsernamePasswordAuthenticationToken(client, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                } else if ("employee".equals(userType)) {
                    EmployeeModel employee = employeeRepository.findByEmail(loginEmail)
                            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
                    var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
                    var authentication = new UsernamePasswordAuthenticationToken(employee, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new RuntimeException("Usuário inválido.");
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");
        }

        return null;
    }
}
