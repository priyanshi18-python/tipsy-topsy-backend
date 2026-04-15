import prisma from "../config/db.js";

// ✅ Create User
export const createUser = async (data) => {
  return await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      created_at: true
    }
  });
};

// ✅ Find User by Email
export const findUserByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: { email }
  });
}; 