const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
    res.send(`
      <html>
      <head><title>Prisma Test</title></head>
      <body>
        <h1>Sovereign Prisma Import Test</h1>
        <p>${posts.length} posts found</p>
        <ul>${posts.map(p => `<li>${p.title}</li>`).join('')}</ul>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h1>DB Error</h1><pre>${err.message}</pre>`);
  }
});

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'unhealthy' });
  }
});

app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
