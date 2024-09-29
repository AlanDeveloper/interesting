import { FastifyInstance } from "fastify";
import { UsersRoutes } from "./@UsersRoutes";
import { CategoriesRoutes } from "./@CategoriesRoutes";

export const routes = async (app: FastifyInstance) => {
    app.register(UsersRoutes);
    app.register(CategoriesRoutes);
}