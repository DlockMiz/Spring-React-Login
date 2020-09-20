package project.school.springreacttemplate.Configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import project.school.springreacttemplate.Security.Filters.JwtFilter;
import project.school.springreacttemplate.Security.Services.CustomUserDetailsService;


/** This class is intended to create a spring security configuration. */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    /** Overriding the default configure function to implement the a custom user authentication. */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    /** Create a new password encoder bean to be used during the implementation of the authenticating the user.  */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /** This is where the magic happens, here we override spring security rest protocol. CSRF token is being generated for
     * the frontend. Routes under authorizeRequests have specific parameters in order to be hit. Nearly every /api/ call
     * requires a jwt in the header in order to authenticate the user.
     *
     * At the bottom we are adding a custom JWT filter that is used to decrypt the token. This is done before anything else
     * hence addFilterBefore.*/
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
            .authorizeRequests()
                .antMatchers("/api/test","/api/login","/api/register","/api/populate","/#/**","/").permitAll()
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .antMatchers("/api/**").hasRole("USER")
                .anyRequest().authenticated()
                .and()
            .exceptionHandling()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /** This will ignore any requests with these routes, normaly used for javascript and css file types. */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                  .antMatchers("/*.js","/css/*.css","/*.ico","/*.json");
    }
}