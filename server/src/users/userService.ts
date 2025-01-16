import { randomUUID } from 'node:crypto';
import { getUserData, writeUserData } from '../data/usersRepository';
import { User } from '../interfaces';

export const getAllUsers = async (
  search: string,
  email: string,
  phoneNumber: string
): Promise<User[]> => {
  const users = await getUserData();

  return filterUsers(users, search, email, phoneNumber);
};

export const getUserById = async (id: string): Promise<User | null> => {
  const users = await getUserData();

  return users.find(user => user.id === id) || null;
};

export const createUser = async (user: User): Promise<User> => {
  const users = await getUserData();

  const newUser = { ...user, id: randomUUID() };

  await writeUserData([...users, newUser]);

  return newUser;
};

export const updateUser = async (
  id: string,
  user: User
): Promise<User | null> => {
  const users = await getUserData();

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const updatedUser = { ...users[userIndex], ...user };

  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;

  await writeUserData(updatedUsers);

  return updatedUser;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const users = await getUserData();

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  const updatedUsers = users.filter(user => user.id !== id);

  await writeUserData(updatedUsers);

  return true;
};

const filterUsers = (
  users: User[],
  searchTerm: string,
  email: string,
  phoneNumber: string
): User[] => {
  return users.filter(user => {
    const matchesSearchTerm = searchTerm
      ? user?.firstName?.includes(searchTerm) ||
        user.email.includes(searchTerm) ||
        user.phoneNumber.includes(searchTerm) ||
        user?.lastName?.includes(searchTerm)
      : true;
    const matchesEmail = email ? user.email.includes(email) : true;
    const matchesPhoneNumber = phoneNumber
      ? user.phoneNumber.includes(phoneNumber)
      : true;
    return matchesSearchTerm && matchesEmail && matchesPhoneNumber;
  });
};
