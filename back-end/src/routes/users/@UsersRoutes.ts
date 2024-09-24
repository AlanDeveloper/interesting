import { FastifyInstance } from "fastify"
import { CreateUser } from "./create-user";
import { UpdateUser } from "./update-user";
import { DeleteUser } from "./delete-user";
import { GetUser } from "./get-users";
import { ShowUser } from "./show-user";

export const UsersRoutes = async (app: FastifyInstance) => {
    app.register(GetUser);
    app.register(ShowUser);
    app.register(CreateUser);
    app.register(UpdateUser);
    app.register(DeleteUser);
}