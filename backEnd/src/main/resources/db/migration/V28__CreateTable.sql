CREATE TABLE tipo_pedido (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT into tipo_pedido(name) VALUES ("ENTREGA"),
    ("VEM BUSCAR"),
    ("MESA");

ALTER TABLE pedido ADD COLUMN id_tipo_pedido INTEGER;
ALTER TABLE pedido  ADD CONSTRAINT fk_pedido_tipo FOREIGN KEY (id_tipo_pedido) REFERENCES tipo_pedido(id);