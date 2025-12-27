import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(410).json({ error: 'This endpoint is deprecated. Analysis must be generated and saved server-side only.' });
} 