import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const UpdateUser = async (app: FastifyInstance) => {
    app.put('/users/{id}', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send([{ id: 1, name: 'bola' }, { id: 2, name: 'boneco' }]);
    });
}