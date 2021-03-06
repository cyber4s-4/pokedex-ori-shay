import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const users: Users[] = [];

const server = express.Router();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./dist/client/validation'));

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
  res.sendFile(path.join(__dirname, '../client/validation/register.html'));
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
  res.redirect('/');
});

server.get('/error', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/validation/error.html'));
});

server.get('/init', isAuthenticated, (req: Request, res: Response) => {
  res.send({ message: true });
});

server.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/validation/login.html'));
});

function isAuthenticated(req: Request, res: Response, next: any) {
  let token = req.cookies.token;
  let user = users.find((u) => u.token == token);
  if (user) next();
  else res.send({ message: false });
}

function findUser(username: string, password: string) {
  let user = users.find(
    (el) => el.password == password && el.username == username
  );
  if (user) return user.token;
  else return undefined;
}

module.exports = server;

interface Users {
  username: string;
  password: string;
  token: string;
}
