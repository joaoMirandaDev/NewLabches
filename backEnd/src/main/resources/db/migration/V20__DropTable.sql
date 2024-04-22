DROP TABLE rel_especialidades_mercadorias;

CREATE TABLE especialidade_mercadoria(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_especialidade INTEGER NOT NULL,
    id_mercadoria INTEGER NOT NULL,
    quantidade INTEGER,
    FOREIGN KEY (id_especialidade) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE
);