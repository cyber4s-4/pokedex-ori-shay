import express, { Request, Response } from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');

const users: { username: string; password: string; token: string }[] = [];

const server = express.Router();
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

server.get('/login', (req: Request, res: Response) => {
  console.log('login');
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

server.post('/login', (req: Request, res: Response) => {
  console.log(req.body);
  let user = {
    username: req.body.username,
    password: req.body.password,
  };
  let token = findUser(user.username, user.password);
  if (token) {
    res.cookie('token', token, {
      maxAge: 900000,
      secure: true,
    });
    res.redirect('/');
  } else res.redirect('/validation/error');
});

server.get('/register', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/register.html'));
});

server.post('/register', (req: Request, res: Response) => {
  console.log(req.body);

  let random = (Math.random() + 1).toString(36).substring(7);
  let user = {
    username: req.body.username,
    password: req.body.password,
    token: random,
  };
  users.push(user);
  console.log(users);

  res.cookie('token', random, {
    maxAge: 900000,
    secure: true,
  });
  res.redirect('/validation');
});

server.get('/error', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/error.html'));
});

server.get('/', isAuthenticated, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.get('/init', (req: Request, res: Response) => {
  let token = req.cookies.token;
  let user = users.find((u) => u.token == token);
  console.log(user);
  if (user) res.send({ message: true });
  else res.send({ message: false });
});

function isAuthenticated(req: Request, res: Response, next: any) {
  let token = req.cookies.token;
  let user = users.find((u) => u.token == token);
  if (user) next();
  else res.redirect('/validation/login');
}

function findUser(username: string, password: string) {
  let user = users.find(
    (el) => el.password == password && el.username == username
  );
  if (user) return user.token;
  else return undefined;
}

module.exports = server;
