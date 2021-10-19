import axios from 'axios'; //importando axios para fazer chamadas externas
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken"

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string,
}

class AuthenticateUserService {

    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, { //gerando token para o usuário
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { login, id, avatar_url, name } = response.data;
        let user = await prismaClient.user.findFirst({ // faz a busca do usuário na base de dados
            where: {
                github_id: id
            }
        })

        if (!user) { //verifica se o dado retornado ao "user" existe, se não existir, cria um novo usuário
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id,
                },
            },
            `${process.env.JWT_SECRET}`, //necessário passar o dado como template string pois não estava reconhecendo como texto
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService }