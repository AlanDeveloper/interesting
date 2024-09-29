import fastify from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";
import fastifyEnv from "@fastify/env";

export const app = fastify();
app.register(routes);
app.register(cors, {});

const schema = {
    type: 'object',
    required: ['APP_PORT', 'APP_HOST'],
    properties: {
        APP_PORT: {
            type: 'number'
        },
        APP_HOST: {
            type: 'string'
        }
    }
}

const options = {
    dotenv: true,
    data: process.env,
    schema
}
app.register(fastifyEnv, options)

app.setErrorHandler(async (error, request, reply) => {
    // Logging locally
    console.log(error);
    reply.status(500).send({ error: "Something went wrong" });
})

app.ready(err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    
    app.listen({ port: Number(process.env.APP_PORT), host: process.env.APP_HOST }, (err, address) => {
        if (err) {
            console.log(err);
        }
    
        console.log(`Server listening at ${address}`);
    });
});

