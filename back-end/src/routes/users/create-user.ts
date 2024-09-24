import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const CreateUser = async (app: FastifyInstance) => {
    app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send([{ id: 1, name: 'bola' }, { id: 2, name: 'boneco' }]);
    });
}