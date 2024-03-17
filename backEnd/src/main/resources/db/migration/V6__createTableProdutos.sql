CREATE TABLE categoria (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  data_cadastro DATE,
  ativo INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE produtos (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  categoria_id SMALLINT,
  ingrediente TEXT,
  data_cadastro DATE,
  ativo INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);
