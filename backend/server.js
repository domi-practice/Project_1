const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '44Million$', 
  database: 'anna_architectural_firm'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

app.get('/api/clients', (req, res) => {
  connection.query('SELECT * FROM clients', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/clients', async (req, res) => {
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)';
  try {
    const [result] = await connection.promise().query(query, [name, email, phone]);
    res.send({ id: result.insertId }); // Send back the ID of the newly created client
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the client.');
  }
});

// DELETE endpoint to delete a client by ID
app.delete('/api/clients/:id', async (req, res) => {
  const clientId = req.params.id;

  // Wrap the query in a new Promise
  const deleteMeetings = new Promise((resolve, reject) => {
    connection.query('DELETE FROM meetings WHERE client_id = ?', [clientId], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  try {
    // Wait for the meetings to be deleted before deleting the client
    await deleteMeetings;

    const deleteClient = new Promise((resolve, reject) => {
      connection.query('DELETE FROM clients WHERE id = ?', [clientId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // Wait for the client to be deleted before sending the response
    const result = await deleteClient;
    res.send(result);

  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting the client or its meetings.');
  }
});

app.get('/api/meetings', (req, res) => {
  const query = `
    SELECT meetings.id, meetings.client_id, meetings.date, meetings.time, meetings.location, meetings.description, clients.name as client_name
    FROM meetings
    INNER JOIN clients ON meetings.client_id = clients.id
  `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/meetings', async (req, res) => {
  const { clientId, date, time, location, description } = req.body;
  const query = 'INSERT INTO meetings (client_id, date, time, location, description) VALUES (?, ?, ?, ?, ?)';
  try {
    const [result] = await connection.promise().query(query, [clientId, date, time, location, description]);
    res.send({ id: result.insertId }); // Send back the ID of the newly created meeting
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the meeting.');
  }
});

// DELETE endpoint to delete a meeting by ID
app.delete
