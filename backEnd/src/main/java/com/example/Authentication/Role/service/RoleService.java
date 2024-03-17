package com.example.Authentication.Role.service;


import com.example.Authentication.Role.model.Role;
import com.example.Authentication.Role.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<Role> findAll() {
       return roleRepository.findAll();
    }

}
