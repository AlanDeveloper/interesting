import { FastifyInstance } from "fastify";
import { createUser, deleteUser, getUsers, showUser, updateUser } from "../controllers/userController";

export const UsersRoutes = async (app: FastifyInstance) => {
    app.get('/users', getUsers);            
    app.get('/users/:userUuid', showUser);         
    app.post('/users', createUser);           
    app.put('/users/:userUuid', updateUser);        
    app.delete('/users/:userUuid', deleteUser);  
}