import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const ShowUser = async (app: FastifyInstance) => {
    app.get('/users/:id', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ id: 1, name: 'bola' });
    });
}