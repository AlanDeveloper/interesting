import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export const CreateUser = async (app: FastifyInstance) => {
    app.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        
        const createUserBody = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        });

        const { name, email, password } = createUserBody.parse(request.body);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return reply.status(201).send(user);
    });
}