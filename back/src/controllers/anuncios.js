import { database } from "../database/connection.js";

export const AnunciosController = {
  list: (req, res) => {
    const stmt = database.prepare("SELECT * FROM ANUNCIO ORDER BY data_criacao DESC");
    const rows = stmt.all();
    res.json(rows);
  },
  create: (req, res) => {
    const { id, id_vendedor, titulo, descricao, preco_unidade, quantidade, status } = req.body;

    database.exec(`
      INSERT INTO ANUNCIO (id, id_vendedor, titulo, descricao, preco_unidade, quantidade, status, data_criacao)
      VALUES (${id}, ${id_vendedor}, '${titulo}', '${descricao}', ${preco_unidade}, ${quantidade}, '${status}', DATE('now'));
    `);

    res.status(201).send();
  },
  delete: (req, res) => {
    const { id } = req.params;

    database.exec(`DELETE FROM ANUNCIO WHERE id = ${id}`);
    
    res.status(204).send();
  },
}