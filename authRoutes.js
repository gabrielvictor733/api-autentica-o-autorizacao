import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { nome, email, senha, funcao } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Usuario já existe.' });

    user = new User({ nome, email, senha, funcao });
    await user.save();

    const token = jwt.sign({ userId: user._id, funcao: user.funcao }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Credenciais invalidas.' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ error: 'Credenciais invalidas.' });

    const token = jwt.sign({ userId: user._id, funcao: user.funcao }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});

export default router;
