import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Start seeding...");
  // await prisma.order.deleteMany();
  // await prisma.cart.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.product.deleteMany();

//   for (const user of userSeed) {
//     await prisma.user.upsert({
//       create: user,
//       update: user,
//       where: { id: user.id },
//     });
//   }
//   for (const setting of SettingsSeed) {
//     await prisma.setting.upsert({
//       create: setting,
//       update: setting,
//       where: { key: setting.key },
//     });
//   }
//   for (const category of CategorySeed) {
//     const { products, ...uCategory } = category;
//     await prisma.category.upsert({
//       where: { id: category.id },
//       create: uCategory,
//       update: uCategory,
//     });
//     for (const product of products) {
//       const { created_at, updated_at, ...uProduct } = product;
//       await prisma.product.upsert({
//         where: { id: product.id },
//         create: {
//           ...uProduct,
//           slug: generateSlug(product.name),
//           categoryId: category.id,
//         },
//         update: {
//           ...uProduct,
//           slug: generateSlug(product.name),
//           categoryId: category.id,
//         },
//       });
//     }
//   }
//   for (const order of OrderSeed) {
//     const { carts, ...uOrder } = order;
//     await prisma.order.upsert({
//       where: { id: order.id },
//       create: { ...uOrder },
//       update: { ...uOrder },
//     });
//     for (const cart of carts) {
//       await prisma.cart.upsert({
//         where: { id: cart.id },
//         create: { ...cart },
//         update: { ...cart },
//       });
//     }
//   }
  console.log("Seeding finished.");
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
