import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post: Prisma.PostCreateInput[] = [];

  for (let i = 0; i < 100; i++) {
    post.push({
      name: `Post ${i}`,
    });
  }

  await prisma.$transaction(post.map((data) => prisma.post.create({ data })));
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
