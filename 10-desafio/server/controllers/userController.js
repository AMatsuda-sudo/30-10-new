const mysql = require('mysql2');

// Connection Pool
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Jogo'
});

// View Users
exports.view = (req, res) => {
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM user WHERE game_name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

exports.create = (req, res) => {
  console.log(req.body); // Log the incoming request body
  const { game_name, data_lancamento, genero, plataforma, nota, comments } = req.body;


  connection.query('INSERT INTO user SET game_name = ?, data_lancamento = ?, genero = ?, plataforma = ?, nota = ?', 
  [game_name, data_lancamento, genero, plataforma, nota], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User  added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}
// Update User
exports.update = (req, res) => {
  const { game_name, data_lancamento, genero, plataforma, nota } = req.body;
  connection.query('UPDATE user SET game_name = ?, data_lancamento = ?, genero = ?, plataforma = ?, nota = ? WHERE id = ?', [ game_name, data_lancamento, genero, plataforma, nota, req.params.id], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          res.render('edit-user', { rows, alert: `${game_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


exports.delete = (req, res) => {
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      let removedUser   = encodeURIComponent('User   successfully removed.');
      res.redirect('/?removed=' + removedUser  );
    } else {
      console.log(err);
      res.status(500).send('Error deleting user');
    }
  });
}

// View Users
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => { 
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}
