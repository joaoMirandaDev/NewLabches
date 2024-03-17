CREATE TABLE colaborador (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  sobrenome VARCHAR(100),
  data_nascimento DATE,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  rg VARCHAR(20),
  estado VARCHAR(2),
  cidade VARCHAR(100),
  cep VARCHAR(8),
  numero VARCHAR(100),
  bairro VARCHAR(500),
  rua VARCHAR(200),
  is_usuario INTEGER,
  email VARCHAR(100),
  telefone VARCHAR(100),
  ativo INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE usuario (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  senha VARCHAR(255) NOT NULL,
  login VARCHAR(11) UNIQUE NOT NULL,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  colaborador_id SMALLINT,
  FOREIGN KEY (colaborador_id) REFERENCES colaborador(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);



