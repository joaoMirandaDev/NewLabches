CREATE TABLE rel_especialidades_mercadorias(
    id SERIAL NOT NULL PRIMARY KEY,
    id_especialidade SMALLINT NOT NULL,
    id_mercadoria SMALLINT NOT NULL,
    FOREIGN KEY (id_especialidade) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE
);