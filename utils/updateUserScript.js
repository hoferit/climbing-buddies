const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: 1, // replace with actual user id you want to test
      },
      data: {
        firstName: 'Test',
        lastName: 'User1',
        climbingLevel: 'Beginner',
        profilePictureUrl:
          'https://res.cloudinary.com/dskop34ej/image/upload/v1689160707/profilepicture/bvysuldlennftg6mquo4.jpg',
      },
    });

    console.log(updatedUser);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
