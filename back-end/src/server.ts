import fastify from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";

export const app = fastify();
app.register(routes);
app.register(cors, {});

app.listen({ port: 4007, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server listening at ${address}`);
});