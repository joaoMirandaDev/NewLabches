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
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(100),
  observacao TEXT,
  mesa SMALLINT,
  ativo INTEGER,
  valor_total DOUBLE,
  id_caixa INTEGER NOT NULL,
  FOREIGN KEY (id_caixa) REFERENCES caixa(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE rel_pedidos_mercadoria (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  id_mercadoria SMALLINT NOT NULL,
  id_pedido SMALLINT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_mercadoria) REFERENCES mercadoria(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE rel_pedidos_especialidade (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  id_especialidade SMALLINT NOT NULL,
  id_pedido SMALLINT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_especialidade) REFERENCES especialidade(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);



