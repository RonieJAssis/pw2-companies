import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const prisma = new PrismaClient();

app.use(routes(prisma));

async function main() {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
