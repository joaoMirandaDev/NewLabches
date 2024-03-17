package com.example.Authentication.Usuario.repository;


import com.example.Authentication.Usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Short> {
   Usuario findByLogin(String login);

}
