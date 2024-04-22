CREATE TABLE unidade_medida (
  id INTEGER NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  ativo INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO lanchonete.unidade_medida (nome, ativo)
VALUES
('KG', 0),
('UN', 0);

CREATE TABLE ingrediente (
  id INTEGER NOT NULL AUTO_INCREMENT,
  nome TEXT,
  id_unidade_medida INTEGER,
  valor_compra DOUBLE,
  valor_venda DOUBLE,
  saldo_estoque DOUBLE,
  porcao DOUBLE,
  data_cadastro DATE,
  ativo INTEGER,
  FOREIGN KEY (id_unidade_medida) REFERENCES unidade_medida(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);
