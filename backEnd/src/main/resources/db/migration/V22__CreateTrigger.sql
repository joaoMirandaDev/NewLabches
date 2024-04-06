ALTER TABLE caixa add COLUMN numero_caixa TEXT;

CREATE TRIGGER gerar_string_ano
BEFORE INSERT ON caixa
FOR EACH ROW
BEGIN
    DECLARE contador INT;
    DECLARE ano_atual INT;
    DECLARE nova_string VARCHAR(10);

     SET ano_atual = YEAR(NOW());

    SELECT COUNT(*) INTO contador FROM caixa WHERE YEAR(ano_atual) = ano_atual;

    IF contador = 0 THEN
        SET nova_string = CONCAT('0001/', ano_atual);
    ELSE
        SET contador = contador + 1;
        SET nova_string = CONCAT(LPAD(contador, 4, '0'), '/', ano_atual);
    END IF;

    SET NEW.numero_caixa = nova_string;
END;

