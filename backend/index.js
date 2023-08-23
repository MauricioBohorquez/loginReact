
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_system',
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar con base de datos:', err);
  } else {
    console.log('Connected database');
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.status(200).send('Usuario registrado correctamente');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al iniciar', err);
      res.status(500).send('Error al iniciar');
    } else {
      if (result.length > 0) {
        res.status(200).send('Login correcto');
      } else {
        res.send('Credenciales Incorrectas');
      }
    }
  });
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
