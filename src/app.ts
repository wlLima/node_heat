import 'dotenv/config' //importando para ter acesso as variaveis de ambiente
import express from 'express';
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: "*" //indica permissão para qualquer fonte possa se conectar seja "frontend, mobile..."
    }
});

io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`);

})

app.use(express.json()); //Antes de qualquer rota, fazer essa declaração para que o express possa receber requisições em JSON
app.use(router);

app.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`); //Redireciona o client para página de auth do git 
})

app.get("/signin/callback", (req, res) => {
    const { code } = req.query;

    return res.json(code);
})

export { serverHttp, io };