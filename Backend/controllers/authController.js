import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import nodemailer from 'nodemailer';

export const signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ error: 'Email already exists or DB error' });
      res.json({ message: 'User registered successfully' });
    });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err || result.length === 0)
      return res.status(400).json({ error: 'User not found' });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

export const signout = (req, res) => {
  res.json({ message: 'User signed out successfully' });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;
  const resetToken = Math.random().toString(36).substring(2, 15);

  db.query('UPDATE users SET reset_token=? WHERE email=?', [resetToken, email], (err, result) => {
    if (err || result.affectedRows === 0)
      return res.status(400).json({ error: 'User not found' });

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Link',
      text: `Your reset token is: ${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: 'Email not sent' });
      res.json({ message: 'Reset token sent to email' });
    });
  });
};
