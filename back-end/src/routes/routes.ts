import { FastifyInstance } from "fastify";
import { UsersRoutes } from "./users/@UsersRoutes";

export const routes = async (app: FastifyInstance) => {
    app.register(UsersRoutes);
}