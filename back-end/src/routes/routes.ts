import { FastifyInstance } from "fastify";
import { UsersRoutes } from "./@UsersRoutes";

export const routes = async (app: FastifyInstance) => {
    app.register(UsersRoutes);
}