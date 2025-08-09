import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync(':memory:');

database.exec(`
CREATE TABLE VENDEDOR (
  id_usuario INT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  CHECK (nome <> '')
);

CREATE TABLE ANUNCIO (
  id SERIAL PRIMARY KEY,
  id_vendedor INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  preco_unidade DECIMAL(10,2) NOT NULL CHECK (preco_unidade > 0),
  quantidade INT NOT NULL CHECK (quantidade >= 0),
  visualizacoes INT DEFAULT 0,
  data_criacao DATE NOT NULL,
  data_ultima_venda DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('ativo','inativo')),
  FOREIGN KEY (id_vendedor) REFERENCES VENDEDOR(id_usuario)
);

CREATE INDEX data_criacao_idx ON ANUNCIO(data_criacao);

INSERT INTO VENDEDOR (id_usuario, nome) VALUES (1, 'João da Silva');
INSERT INTO ANUNCIO (id, id_vendedor, titulo, descricao, preco_unidade, quantidade, data_criacao, status) 
VALUES (1, 1, 'Celular XYZ', 'Celular em ótimo estado', 1200.00, 10, '2023-10-01', 'ativo');
`)

export { database };
