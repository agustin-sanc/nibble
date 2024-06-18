import { clerkClient } from "@clerk/nextjs/server";

export const getUserList = async () => {
  try {
    const users = await clerkClient.users.getUserList({
      orderBy: "-created_at",
    });

    return users.map((user) => ({
      // TODO: Add legajo
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      isProfessor: user.publicMetadata.isProfessor as boolean,
    }));
  } catch (e) {
    console.error(e);
    return mockUserList;
  }
};

const mockUserList = [
  {
    id: "1",
    email: "johndoe@mail.com",
    firstName: "John",
    lastName: "Doe",
    isProfessor: false,
  },
  {
    id: "2",
    email: "janedoe@mail.com",
    firstName: "Jane",
    lastName: "Doe",
    isProfessor: false,
  },
  {
    id: "3",
    email: "alicedoe@mail.com",
    firstName: "Alice",
    lastName: "Doe",
    isProfessor: false,
  },
  {
    id: "4",
    email: "bobdoe@mail.com",
    firstName: "Bob",
    lastName: "Doe",
    isProfessor: true,
  },
];
