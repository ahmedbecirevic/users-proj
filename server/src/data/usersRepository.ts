import fs from 'node:fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

import { User } from '../interfaces';

const dataFilePath = path.join(__dirname, 'users.json');

export const feedUserData = async (): Promise<void> => {
  const users = await getJsonData();

  const usersWithIds = users.map(user => {
    const id = randomUUID();
    return {
      ...user,
      id,
    };
  });

  try {
    await fs.writeFile(dataFilePath, JSON.stringify(usersWithIds), {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (error) {
    console.error('Error writing data to file', error);
  }
};

export const getUserData = async (): Promise<User[]> => {
  const users = await getJsonData();

  return users.flatMap(user => {
    if (user?.phoneNumbers) {
      return user.phoneNumbers.map(phoneNumber => ({
        ...user,
        phoneNumber: phoneNumber.value,
      }));
    }

    return [{ ...user, phoneNumber: '' }];
  });
};

export const writeUserData = async (data: User[]): Promise<User[]> => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data), {
      encoding: 'utf8',
      flag: 'w',
    });
    return data;
  } catch (error) {
    console.error('Error writing data to file', error);
  }

  return [];
};

const getJsonData = async (): Promise<User[]> => {
  const rawData = await fs.readFile(dataFilePath, 'utf-8');

  return JSON.parse(rawData) as User[];
};
