package com.example.Authentication.Itens.controller;

import com.example.Authentication.Itens.DTO.ItemDTO;
import com.example.Authentication.Itens.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ingrediente")
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    public void salvarPessoa(@RequestBody ItemDTO ingrediente)  {
        itemService.cadastroIngrediente(ingrediente);
    }
}

