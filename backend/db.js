import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/daftar', (req, res) => {
    const sql = "INSERT INTO users (fullName, username, email, password) VALUES (?)";
    const values = [
        req.body.fullName,
        req.body.username,
        req.body.email,
        req.body.password,
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Error in Node", Error: err });
        }
        return res.status(201).json({ Message: "User registered successfully", Data: result });
    });
});

app.post('/masuk', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });

        if (result.length > 0) {
            return res.json({
                Masuk: true,
                user: result[0],
            });
        } else {
            return res.json({ Masuk: false });
        }
    });
});

app.post('/add-wallet', (req, res) => {
    const { name, balance } = req.body;

    const checkWalletQuery = "SELECT * FROM wallets WHERE name = ?";
    const updateWalletQuery = "UPDATE wallets SET balance = ? WHERE name = ?";
    const addWalletQuery = "INSERT INTO wallets (name, balance) VALUES (?, ?)";

    db.query(checkWalletQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ Message: "Server Error" });

        if (result.length > 0) {
            const newBalance = balance;
            db.query(updateWalletQuery, [newBalance, name], (err) => {
                if (err) return res.status(500).json({ Message: "Update Error" });
                return res.json({ Message: "Saldo dompet berhasil diperbarui" });
            });
        } else {
            db.query(addWalletQuery, [name, balance], (err) => {
                if (err) return res.status(500).json({ Message: "Insert Error" });
                return res.json({ Message: "Dompet berhasil ditambahkan" });
            });
        }
    });
});

app.put('/update-profile', (req, res) => {
    const { userId, fullName, email, password } = req.body;

    const sql = "UPDATE users SET fullName = ?, email = ?, password = ? WHERE id = ?";
    const values = [fullName, email, password, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Error updating profile", Error: err });
        }
        return res.json({ Message: "Profile updated successfully", Data: result });
    });
});

app.post('/add-budget', (req, res) => {
    const { nominal } = req.body;

    const sql = "INSERT INTO budget (nominal) VALUES (?)";

    db.query(sql, [nominal], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ Message: "Error saving budget", Error: err });
        }
        return res.status(201).json({ Message: "Budget saved successfully", Data: result });
    });
});

app.get('/budget', (req, res) => {
    const sql = "SELECT * FROM budget ORDER BY id ASC";

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching budget data:', err);
            return res.status(500).json({ Message: "Error fetching budget data", Error: err });
        }
        return res.json({
            Message: "Budget data retrieved successfully",
            Data: result,
        });
    });
});

app.post('/add-income', (req, res) => {
    const { date, walletName, source, amount, notes } = req.body;

    const sql = "INSERT INTO income (date, wallet_name, source, amount, notes) VALUES (?, ?, ?, ?, ?)";
    const values = [date, walletName, source, amount, notes];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting income:', err);
            return res.status(500).json({ Message: "Error saving income", Error: err });
        }
        return res.status(201).json({ Message: "Income added successfully", Data: result });
    });
});

app.get('/income', (req, res) => {
    const sql = "SELECT * FROM income ORDER BY date ASC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching income data:', err);
            return res.status(500).json({ Message: "Error fetching income data", Error: err });
        }
        return res.json({ Message: "Income data retrieved successfully", Data: result });
    });
});

app.post('/add-expense', (req, res) => {
    const { date, walletName, source, amount, notes } = req.body;

    const sql = "INSERT INTO expenses (date, wallet_name, source, amount, notes) VALUES (?, ?, ?, ?, ?)";
    const values = [date, walletName, source, amount, notes];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting expense:', err);
            return res.status(500).json({ Message: "Error saving expense", Error: err });
        }
        return res.status(201).json({ Message: "Expense added successfully", Data: result });
    });
});

app.get('/expenses', (req, res) => {
  const sql = "SELECT * FROM expenses ORDER BY date ASC";
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching expenses data:', err);
          return res.status(500).json({ Message: "Error fetching expenses data", Error: err });
      }
      return res.json({ Message: "Expenses data retrieved successfully", Data: result });
  });
});

app.listen(8081, () => {
    console.log("Connected to the server on port 8081");
});
