import { FastifyInstance } from "fastify"
import { CreateUser } from "./create-user";
import { UpdateUser } from "./update-user";
import { DeleteUser } from "./delete-user";

export const UsersRoutes = async (app: FastifyInstance) => {
    app.register(CreateUser);
    // app.register(UpdateUser);
    // app.register(DeleteUser);
}