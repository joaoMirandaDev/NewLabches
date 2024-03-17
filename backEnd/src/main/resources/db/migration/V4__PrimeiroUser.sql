INSERT INTO lanchonete.colaborador
(id, nome, sobrenome, data_nascimento, cpf, rg, estado, cidade, cep, numero, bairro, rua, is_usuario, email, telefone, ativo)
VALUES(1, 'Joao victor', NULL, NULL, '13226726609', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO lanchonete.usuario
(id, senha, login, data_cadastro, colaborador_id, `role`)
VALUES(1, '$2a$10$IAbOgyrcbEUgEHjrC4wWVuYgQcWFK7Hc/n2uIQ8HYGwVgfU6UETh6', '13226726609', '2024-01-20 15:38:39', 1, 1);