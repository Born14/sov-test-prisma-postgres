const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      { title: 'Hello World', content: 'First post from seed', published: true },
      { title: 'Draft Post', content: 'This is a draft', published: false },
    ],
    skipDuplicates: true,
  });
  console.log('Seed complete');
}

main().catch(console.error).finally(() => prisma.$disconnect());
