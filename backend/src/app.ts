import "dotenv/config";
import express from "express";
import http from "http"
import cors from "cors";
import { Server } from "socket.io"
import { router } from "./router";

const app = express();
app.use(cors())

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`on ${socket.id}`)
})

app.use(express.json())
app.use(router);

app.get("/github", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID}`);
})

app.get("/signin/callback", (req, res) => {
  const { code } = req.query
  res.json(code)
})

export { httpServer, io }