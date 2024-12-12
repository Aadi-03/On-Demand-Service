const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // Create some dummy addresses
    const address1 = await prisma.address.create({
      data: {
        houseNumber: "123",
        streetName: "Main Street",
        state: "California",
        country: "USA",
        pincode: "90210",
        longitude: -118.4068,
        latitude: 34.0522,
      },
    });
  
    const address2 = await prisma.address.create({
      data: {
        houseNumber: "456",
        streetName: "Elm Street",
        state: "New York",
        country: "USA",
        pincode: "10001",
        longitude: -73.935242,
        latitude: 40.73061,
      },
    });
  
    // Create dummy customers
    const customer1 = await prisma.customer.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        dob: new Date("1990-01-01"),
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
        photoLink: null,
        gender: "Male",
        password: "password123",
        addressId: address1.id,
      },
    });
  
    const customer2 = await prisma.customer.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        dob: new Date("1985-05-15"),
        phoneNumber: "9876543210",
        email: "jane.smith@example.com",
        photoLink: null,
        gender: "Female",
        password: "password456",
        addressId: address2.id,
      },
    });
  
    // Create dummy providers
    const provider1 = await prisma.provider.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        dob: new Date("1988-07-20"),
        phoneNumber: "5551234567",
        email: "mike.johnson@example.com",
        photoLink: null,
        gender: "Male",
        password: "provider123",
        addressId: address1.id,
        available: true,
        workType: "Plumber",
        aadharNumber: "1234-5678-9012",
      },
    });
  
    const provider2 = await prisma.provider.create({
      data: {
        firstName: "Alice",
        lastName: "Brown",
        dob: new Date("1992-09-10"),
        phoneNumber: "5559876543",
        email: "alice.brown@example.com",
        photoLink: null,
        gender: "Female",
        password: "provider456",
        addressId: address2.id,
        available: true,
        workType: "Carpenter",
        aadharNumber: "5678-1234-9012",
      },
    });
  
    // Create dummy orders
    const order1 = await prisma.order.create({
      data: {
        taskName: "Fix the sink",
        doneById: provider1.id,
        askedById: customer1.id,
        completed: false,
      },
    });
  
    const order2 = await prisma.order.create({
      data: {
        taskName: "Build a shelf",
        doneById: provider2.id,
        askedById: customer2.id,
        completed: true,
      },
    });
  
    // Create dummy feedback
    await prisma.feedback.create({
      data: {
        star: 5,
        feedback: "Excellent work!",
        givenById: customer2.id,
        givenToId: provider2.id,
      },
    });
  
    await prisma.feedback.create({
      data: {
        star: 4,
        feedback: "Good job, but could be faster.",
        givenById: customer1.id,
        givenToId: provider1.id,
      },
    });
  
    console.log("Database seeded successfully!");
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })