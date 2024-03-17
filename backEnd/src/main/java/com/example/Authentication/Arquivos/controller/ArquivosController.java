package com.example.Authentication.Arquivos.controller;

import com.example.Authentication.Arquivos.model.FileName;
import com.example.Authentication.Arquivos.service.ArquivosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/arquivos")
public class ArquivosController {
    @Autowired
    private ArquivosService arquivosService;

    @Autowired
    public ArquivosController(ArquivosService arquivosService) {
        this.arquivosService = arquivosService;
    }

//    @CrossOrigin(origins = "http://localhost:8080/")
//    @PostMapping("/upload/{descricao}/{usuario}/{valorPrestacao}")
//    public ResponseEntity<String> upload(@PathVariable String descricao, @PathVariable Short usuario,
//         @PathVariable Double valorPrestacao, @RequestParam MultipartFile multipartFile) {
//        try {
//            arquivosUploadService.save(descricao, usuario, multipartFile);
//            return ResponseEntity.ok("Arquivo salvo com sucesso!");
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @CrossOrigin(origins = "http://localhost:8080/")
//    @GetMapping("/upload/{id}")
//    public ResponseEntity<Object> getArquivo(@PathVariable Short id) {
//        return arquivosUploadService.getArquivo(id);
//    }


    @CrossOrigin(origins = "http://localhost:8080/")
    @PostMapping("/upload")
    public String uploadFIle(@RequestParam("file") MultipartFile file) throws Exception {
        return arquivosService.saveTemp(file);
    }


    @CrossOrigin(origins = "http://localhost:8080/")
    @PostMapping("/uploadUser")
    public String uploadFIle(@RequestBody FileName file) throws Exception {
        return arquivosService.save(file);
    }

    @CrossOrigin(origins = "http://localhost:8080/")
    @PostMapping("/image")
    public ResponseEntity<Resource> getImage(@RequestBody FileName fileName) throws Exception {
        return arquivosService.getImagem(fileName.getKey());
    }

}
