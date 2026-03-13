package kr.co.allteachers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // ── 공개 GET 엔드포인트 (인증 불필요) ─────────────────────────
                .requestMatchers(HttpMethod.GET,
                    "/api/categories/**",
                    "/api/courses/**",
                    "/api/banners/**",
                    "/api/partners/**",
                    "/api/boards/**",
                    "/api/reviews/**"
                ).permitAll()

                // ── 인증 엔드포인트 ────────────────────────────────────────────
                .requestMatchers(
                    "/api/auth/**",
                    "/login/oauth2/**",
                    "/oauth2/**"
                ).permitAll()

                // ── Actuator ───────────────────────────────────────────────────
                .requestMatchers("/actuator/health").permitAll()

                // ── 나머지 전부 인증 필요 ──────────────────────────────────────
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
