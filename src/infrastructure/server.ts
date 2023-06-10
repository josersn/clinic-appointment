import fastify, { FastifyInstance as httpServerInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { resolve } from "path";
import { bootstrap } from "fastify-decorators";

export type httpServer = httpServerInstance<
  Server,
  IncomingMessage,
  ServerResponse
>;

async function server(): Promise<httpServer> {
  return fastify({
    requestTimeout: 30,
    logger: true,
    trustProxy: true,
  });
}

export default async () => {
  const app = await server();

  await app.register(bootstrap, {
    directory: resolve(__dirname),
    mask: /\.controller\.[j|t]s$/,
  });

  app.get("/", async (req, reply) => {
    reply.status(200).send("Welcome to Clinic API");
  });

  return app;
};
