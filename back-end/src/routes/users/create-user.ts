import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const CreateUser = async (app: FastifyInstance) => {
    app.post('/users', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ id: 1, name: 'bola' });
    });
}