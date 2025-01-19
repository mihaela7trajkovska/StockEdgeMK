
package mk.ukim.finki.stockedgemk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/h2-console/**", "/api/auth/**", "/register", "/api/stocks/tickers", "/api/stock-data/**").permitAll()
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())) // For H2 console
                .httpBasic(Customizer.withDefaults()); // Basic authentication for simplicity

        return http.build();
    }

//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/h2-console/**", "/api/auth/**", "/register", "/api/stocks/tickers").permitAll() // Allow public access to tickers
//                        .anyRequest().authenticated()
//                )
//                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())) // For H2 console
//                .formLogin(form -> form
//                        .loginPage("/api/auth/login") // Use API login endpoint
//                        .defaultSuccessUrl("/dashboard", true) // Redirect after successful login
//                        .permitAll()
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/logout")
//                        .logoutSuccessUrl("/api/auth/login") // Redirect back to login after logout
//                        .permitAll()
//                );
//
//        return http.build();
//    }


}

