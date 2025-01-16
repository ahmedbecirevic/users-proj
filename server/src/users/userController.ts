import { Request, Response } from 'express';

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './userService';

export const getAll = async (req: Request, res: Response) => {
  const users = await getAllUsers(
    req.query.query as string,
    req.query.email as string,
    req.query.phoneNumber as string
  );

  res.status(200).json(users);
};

export const getById = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    res.status(404).json({ error: 'Not found.' });
  } else {
    res.status(200).json(user);
  }
};

export const create = async (req: Request, res: Response) => {
  const createdUser = await createUser(req.body);

  res.status(201).json(createdUser);
};

export const update = async (req: Request, res: Response) => {
  const updatedUser = await updateUser(req.body?.id, req.body);

  if (!updatedUser) {
    res.status(404).json({ error: 'Not found.' });
  } else {
    res.status(200).json(updatedUser);
  }
};

export const remove = async (req: Request, res: Response) => {
  const response = await deleteUser(req.params.id);

  res.status(204).json(response);
};
