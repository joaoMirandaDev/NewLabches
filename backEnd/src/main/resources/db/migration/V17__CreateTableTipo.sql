CREATE TABLE tipo (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  ativo INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO lanchonete.tipo (nome, ativo)
VALUES
('INGREDIENTE', 0),
('UTENSÍLIO', 0),
('BEBIDA', 0),
('SORVETE', 0);


ALTER TABLE lanchonete.mercadoria
ADD COLUMN id_tipo SMALLINT;

ALTER TABLE lanchonete.mercadoria
ADD CONSTRAINT id_tipo
FOREIGN KEY (id_tipo) REFERENCES tipo(id);