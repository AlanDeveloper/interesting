import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { prisma } from "../lib/prisma";

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany({
        where: {
            deletedAt: null,
        }
    });

    return reply.status(200).send(users);
};

export const showUser = async (request: FastifyRequest, reply: FastifyReply) => {
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

    return reply.status(200).send(user);
}

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const createUserBody = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    });

    const { name, email, password } = createUserBody.parse(request.body);

    await bcrypt.hash(password, 10).then(async (hash) => {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });

        return reply.status(201).send(user);
    }).catch(err => {
        console.error('Erro:', err);
    });
}

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {

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
}

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {

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
}