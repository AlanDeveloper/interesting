import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export const getCategories = async (request: FastifyRequest, reply: FastifyReply) => {
    const categories = await prisma.category.findMany({
        where: {
            deletedAt: null,
        }
    });

    return reply.status(200).send(categories);
};

export const showCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    const getCategoryParam = z.object({
        categoryUuid: z.string().uuid(),
    });

    const { categoryUuid } = getCategoryParam.parse(request.params);

    const category = await prisma.category.findFirst({
        where: {
            uuid: categoryUuid,
            deletedAt: null,
        },
    });

    if (!category) {
        return reply.status(404).send('Not found');
    }

    return reply.status(200).send(category);
}

export const createCategory = async (request: FastifyRequest, reply: FastifyReply) => {

    const createCategoryBody = z.object({
        name: z.string(),
    });

    const { name } = createCategoryBody.parse(request.body);

    const category = await prisma.category.create({
        data: {
            name,
        }
    });

    return reply.status(201).send(category);
}

export const updateCategory = async (request: FastifyRequest, reply: FastifyReply) => {

    const getCategoryParam = z.object({
        categoryUuid: z.string().uuid(),
    });

    const { categoryUuid } = getCategoryParam.parse(request.params);

    let category = await prisma.category.findFirst({
        where: {
            uuid: categoryUuid,
            deletedAt: null,
        },
    });

    if (!category) {
        return reply.status(404).send('Not found');
    }

    const updateCategoryBody = z.object({
        name: z.string(),
    });

    const { name } = updateCategoryBody.parse(request.body);

    category = await prisma.category.update({
        where: {
            id: category!.id,
        },
        data: {
            name,
        },
    });

    return reply.status(200).send(category);
}

export const deleteCategory = async (request: FastifyRequest, reply: FastifyReply) => {

    const getCategoryParam = z.object({
        categoryUuid: z.string().uuid(),
    });

    const { categoryUuid } = getCategoryParam.parse(request.params);

    const category = await prisma.category.findFirst({
        where: {
            uuid: categoryUuid,
            deletedAt: null,
        },
    });

    if (!category) {
        return reply.status(404).send('Not found');
    }

    await prisma.category.delete({
        where: {
            id: category.id
        },
    });

    return reply.status(204).send();
}