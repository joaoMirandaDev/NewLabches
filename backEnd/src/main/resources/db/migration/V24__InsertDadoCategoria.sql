ALTER TABLE categoria DROP COLUMN data_cadastro;
INSERT INTO lanchonete.categoria
(nome, ativo)
VALUES('Combo', 0);