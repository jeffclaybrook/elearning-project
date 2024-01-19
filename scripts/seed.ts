import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
 try {
  await prisma.category.createMany({
   data: [
    { name: "Computer Science" },
    { name: "Music" },
    { name: "Fitness" },
    { name: "Photography" },
    { name: "Accounting" },
    { name: "Engineering" },
    { name: "Film" }
   ]
  })
  console.log("Success")
 } catch (error) {
  console.log("Error seeding the database categories", error)
 } finally {
  await prisma.$disconnect()
 }
}

main()