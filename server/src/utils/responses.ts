import { Response } from 'express';

export const responseOk = (res: Response, data: any) =>
  res.status(200).json(data);

export const responseNotFound = (res: Response) =>
  res.status(404).json({ error: 'Not found.' });
