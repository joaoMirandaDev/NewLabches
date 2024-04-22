CREATE TABLE arquivos (
  id INTEGER NOT NULL AUTO_INCREMENT,
  usuario_id INTEGER,
  nome TEXT,
  arquivos TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE hibernate_sequence (
    next_val BIGINT
);
INSERT INTO hibernate_sequence VALUES(1);
