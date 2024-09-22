var express = require('express');
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', async(req, res, next) => {
  const result = await db.find();
  res.render('index', { title: 'Express',result });
});

/* POST save data */
router.post("/save", async (req, res) => {
  try {
    const customer = req.body;
    const result = await db.insert(customer); // Insere os dados do cliente no banco de dados
    res.json(result); // Retorna o resultado em JSON
  } catch (error) {
    console.error("Erro ao salvar o cliente:", error);
    res.status(500).json({ error: 'Failed to save customer' }); // Tratamento de erro
  }
});

module.exports = router;
