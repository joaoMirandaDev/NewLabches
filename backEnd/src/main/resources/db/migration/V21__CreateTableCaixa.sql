CREATE TABLE caixa (
  id INTEGER NOT NULL AUTO_INCREMENT,
  valor_abertura_caixa DOUBLE,
  valor_fechamento_caixa DOUBLE,
  data_abertura DATE,
  data_fechamento DATE,
  observacao TEXT,
  ativo INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE pedido (
  id INTEGER NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(100),
  observacao TEXT,
  mesa INTEGER,
  ativo INTEGER,
  valor_total DOUBLE,
  id_caixa INTEGER NOT NULL,
  id_forma_pagamento INTEGER,
  FOREIGN KEY (id_caixa) REFERENCES caixa(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE pedidos_mercadoria (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_mercadoria INTEGER NOT NULL,
  id_pedido INTEGER NOT NULL,
  quantidade INTEGER,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE pedidos_especialidade (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_especialidade INTEGER NOT NULL,
  id_pedido INTEGER NOT NULL,
  quantidade INTEGER,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_especialidade) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE adicional_pedido_especialidade (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_mercadoria INTEGER NOT NULL,
  id_pedidos_especialidade INTEGER NOT NULL,
  quantidade INTEGER,
  FOREIGN KEY (id_pedidos_especialidade) REFERENCES pedidos_especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);



