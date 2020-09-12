package project.school.springreacttemplate.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.school.springreacttemplate.ApiModels.AccountData.AuthRequest;
import project.school.springreacttemplate.ApiModels.AccountData.RegisterUser;
import project.school.springreacttemplate.Entities.Users.Role;
import project.school.springreacttemplate.Entities.Users.User;
import project.school.springreacttemplate.Repositories.RoleRepository;
import project.school.springreacttemplate.Repositories.UserRepository;
import project.school.springreacttemplate.Security.Services.JwtUtil;

import java.util.HashSet;
import java.util.Set;

@RestController
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/api/register")
    public void register(@RequestBody RegisterUser registerUser) {
        User user = new User();
        user.setUsername(registerUser.getUsername());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName(registerUser.getRole()));
        user.setRoles(roles);

        userRepository.save(user);
    }

    @PostMapping("/api/login")
    public String login(@RequestBody AuthRequest authRequest) throws Exception  {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception ex) {
            throw new Exception("invalid"+" username/password");
        }
        return jwtUtil.generateToken(authRequest.getUsername());
    }

    @GetMapping("/api/user")
    public String user(){
        return "This request is a successfully authenticated call with a JWT and User role.";
    }

    @GetMapping("/api/admin/test")
    public String adminTest(){
        return "This request is a successfully authenticated call with a JWT and Admin role.";
    }
}
