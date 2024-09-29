import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcryptjs';

export const UpdateUser = async (app: FastifyInstance) => {
    app.put('/users/:userUuid', async (request: FastifyRequest, reply: FastifyReply) => {

        const getUserParam = z.object({
            userUuid: z.string().uuid(),
        });

        const { userUuid } = getUserParam.parse(request.params);

        let user = await prisma.user.findFirst({
            where: {
                uuid: userUuid,
                deletedAt: null,
            },
        });

        if (!user) {
            return reply.status(404).send('Not found');
        }

        const updateUserBody = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        });

        const { name, email, password } = updateUserBody.parse(request.body);

        await bcrypt.hash(password, 10).then(async (hash) => {
            user = await prisma.user.update({
                where: {
                    id: user!.id,
                },
                data: {
                    name,
                    email,
                    password: hash,
                },
            });
    
            return reply.status(200).send(user);
        }).catch(err => {
            console.error('Erro:', err);
        });
    });
}