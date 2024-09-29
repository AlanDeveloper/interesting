import { FastifyInstance } from "fastify";
import { createCategory, deleteCategory, getCategories, showCategory, updateCategory } from "../controllers/categoryController";

export const CategoriesRoutes = async (app: FastifyInstance) => {
    app.get('/categories', getCategories);
    app.get('/categories/:categoryUuid', showCategory);
    app.post('/categories', createCategory);
    app.put('/categories/:categoryUuid', updateCategory);
    app.delete('/categories/:categoryUuid', deleteCategory);
};
