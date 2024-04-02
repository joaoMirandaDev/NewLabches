DROP TABLE rel_especialidades_mercadorias;

CREATE TABLE especialidade_mercadoria(
    id SERIAL NOT NULL PRIMARY KEY,
    id_especialidade SMALLINT NOT NULL,
    id_mercadoria SMALLINT NOT NULL,
    quantidade SMALLINT,
    FOREIGN KEY (id_especialidade) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE
);