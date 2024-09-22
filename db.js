require('dotenv').config(); // Carrega as variáveis do arquivo .env
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI; // URI do MongoDB
const dbName = process.env.MONGO_DATABASE; // Nome do banco de dados

let db;

async function connect() {
  if (db) return db; // Retorna a conexão existente, se houver

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log(`Conectado ao banco de dados: ${dbName}`);
    db = client.db(dbName); // Conecta ao banco definido em MONGO_DATABASE
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

async function insert(data) {
  const database = await connect();
  const result = await database.collection('customers').insertOne(data); // Insere na coleção 'customers'
  return result;
}

async function find(data) {
   const database = await connect();
   return db.collection('customers').find().toArray(); // Insere na coleção 'customers'

  }
module.exports = { insert,
    find
 };
