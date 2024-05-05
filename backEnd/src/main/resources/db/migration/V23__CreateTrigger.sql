ALTER TABLE pedido add COLUMN numero_pedido TEXT;

CREATE TRIGGER gerar_string_ano_pedido
BEFORE INSERT ON pedido
FOR EACH ROW
BEGIN
    DECLARE contador INT;
    DECLARE ano_atual INT;
    DECLARE nova_string VARCHAR(10);

     SET ano_atual = YEAR(NOW());

    SELECT COUNT(*) INTO contador FROM pedido;

    IF contador = 0 THEN
        SET nova_string = CONCAT('0001/', ano_atual);
    ELSE
        SET contador = contador + 1;
        SET nova_string = CONCAT(LPAD(NEW.id, 4, '0'), '/', ano_atual);
    END IF;

    SET NEW.numero_pedido = nova_string;
END;

