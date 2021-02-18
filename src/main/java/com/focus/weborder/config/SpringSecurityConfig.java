package com.focus.weborder.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.focus.weborder.config.BasicAuthenticationPoint;

@Configuration
// http://docs.spring.io/spring-boot/docs/current/reference/html/howto-security.html
// Switch off the Spring Boot security configuration
//@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;
    
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
    
	@Autowired
	private DataSource dataSource;

    @Autowired
    private BasicAuthenticationPoint basicAuthenticationPoint;
    
    @Value("${spring.queries.users-query}")
	private String usersQuery;
	
	@Value("${spring.queries.roles-query}")
	private String rolesQuery;

    // roles admin allow to access /admin/**
    // roles user allow to access /user/**
    // custom 403 access denied handler
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/weborder/registration").hasAnyRole("ADMIN")
                .antMatchers("/weborder/resetpassword").hasAnyRole("ADMIN")
                .antMatchers("/weborder/changepassword").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/changepassworduser").hasAnyRole("ADMIN")
                .antMatchers("/weborder/history").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/report").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/downloadFileIndex").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/parameterDownloadIndex").hasAnyRole("ADMIN")
                .antMatchers("/weborder/order").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/upload").hasAnyRole("ADMIN")
                .antMatchers("/weborder/uploadhistory").hasAnyRole("ADMIN")
                .antMatchers("/weborder/401").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/404").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/405").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/500").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder").hasAnyRole("USER","ADMIN")
                .antMatchers("/weborder/rest/**").permitAll()          
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and()
                .exceptionHandling().accessDeniedHandler(accessDeniedHandler);

        http.httpBasic().authenticationEntryPoint(basicAuthenticationPoint);
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {


		auth.
			jdbcAuthentication()
				.usersByUsernameQuery(usersQuery)
				.authoritiesByUsernameQuery(rolesQuery)
				.dataSource(dataSource)
				.passwordEncoder(bCryptPasswordEncoder);
		
        /*auth.inMemoryAuthentication()
                .withUser("user").password("password").roles("USER")
                .and()
                .withUser("admin").password("password").roles("ADMIN");*/
    }

    
    /*//Spring Boot configured this already.
    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }
*/
}
