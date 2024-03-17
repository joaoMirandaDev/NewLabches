package com.example.Authentication.Role.controller;


import com.example.Authentication.Role.model.Role;
import com.example.Authentication.Role.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/role/")
@Slf4j
public class RoleController {

    private final RoleService roleService;

    @GetMapping(produces = "application/json")
    public List<Role> findAllRole() {
        return roleService.findAll();
    }

}


