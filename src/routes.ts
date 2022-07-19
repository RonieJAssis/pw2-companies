import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export default function routes(client: PrismaClient): Router {
  const router = Router();
  const baseRoute = "/companies";

  router.post(baseRoute, (req, res) => {
    const { name, description, employees } = req.body;

    if (!name || !description || !employees) {
      res.status(400).send("Missing required fields");
      return;
    }

    client.companies
      .create({
        data: {
          name,
          description,
          employees,
        },
      })
      .then((company: any) => {
        res.json(company);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put(`${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    const { name, description, employees } = req.body;

    if (!name || !description || !employees) {
      res.status(400).send("Missing required fields");
      return;
    }

    client.companies
      .update({
        where: { id },
        data: {
          name,
          description,
          employees,
        },
      })
      .then((company: any) => {
        res.json(company);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get(`${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;

    client.companies
      .findUnique({
        where: { id },
      })
      .then((company: any) => {
        res.json(company);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get(baseRoute, (req, res) => {
    client.companies
      .findMany()
      .then((companies: any) => {
        res.json(companies);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete(`${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;

    client.companies
      .delete({
        where: { id },
      })
      .then((company: any) => {
        res.json(company);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
}
