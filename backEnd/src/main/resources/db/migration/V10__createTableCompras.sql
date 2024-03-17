CREATE TABLE forma_pagamento (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  ativo INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO lanchonete.forma_pagamento (nome, ativo)
VALUES
('PIX', 0),
('CARTÃO', 0),
('PRAZO', 0),
('DINHEIRO', 0);

CREATE TABLE registro_compras (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  id_forma_pagamento SMALLINT,
  id_fornecedor SMALLINT,
  data_compra DATE,
  data_pagamento DATE,
  observacao TEXT,
  valor_total_compra DOUBLE,
  pagamento_compra INTEGER,
  FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id) ON UPDATE CASCADE ON DELETE CASCADE,
  ativo INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE ingredientes_compra (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  id_ingrediente SMALLINT NOT NULL,
  valor_compra DOUBLE NOT NULL,
  data DATE,
  id_registro_compra SMALLINT NOT NULL,
  quantidade DOUBLE NOT NULL,
  FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_registro_compra) REFERENCES registro_compras(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
)
