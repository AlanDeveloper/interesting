import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export const GetUser = async (app: FastifyInstance) => {
    app.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: null,
            }
        });

        return reply.status(200).send(users);
    });
}