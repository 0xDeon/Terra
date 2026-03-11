import Fastify from "fastify";
import { healthRoutes } from "./routes/health";

const app = Fastify({ logger: true });

app.register(healthRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
