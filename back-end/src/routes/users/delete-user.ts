import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const DeleteUser = async (app: FastifyInstance) => {
    app.delete('/users/:id', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ id: 1, name: 'bola' });
    });
}