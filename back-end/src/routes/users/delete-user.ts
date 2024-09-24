import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export const DeleteUser = async (app: FastifyInstance) => {
    app.delete('/users/:userUuid', async (request: FastifyRequest, reply: FastifyReply) => {
        
        const getUserParam = z.object({
            userUuid: z.string().uuid(),
        });
        
        const { userUuid } = getUserParam.parse(request.params);
        
        const user = await prisma.user.findFirst({
            where: {
                uuid: userUuid,
                deletedAt: null,
            },
        });

        if (!user) {
            return reply.status(404).send('Not found');
        }

        await prisma.user.delete({
            where: {
                id: user.id
            },
        });

        return reply.status(204).send();
    });
}