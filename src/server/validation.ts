import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { CheckIfUserExist, CheckUserByToken, CreateNewUser } from './postgres';

const server = express.Router();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./dist/client/validation'));

server.post('/login', async (req: Request, res: Response) => {
  let token = await findUser(req.body.username, req.body.password);
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
  let random = (Math.random() + 1).toString(36).substring(7);
  CreateNewUser(req.body.username, req.body.password, random);
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

async function isAuthenticated(req: Request, res: Response, next: any) {
  let user = await CheckUserByToken(req.cookies.token);
  console.log(user);
  if (user) next();
  else res.send({ message: false });
}

async function findUser(username: string, password: string) {
  let token = await CheckIfUserExist(username, password);
  console.log(token);
  if (token) return token;
  else return undefined;
}

module.exports = server;

interface Users {
  username: string;
  password: string;
  token: string;
}
