import type { NextApiRequest, NextApiResponse } from 'next';
import { put, del } from '@vercel/blob';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk as Buffer);
      }
      const buffer = Buffer.concat(chunks);

      // Get filename and content type from headers
      const filename = req.headers['x-filename'] as string || `photo_${Date.now()}.jpg`;
      const contentType = req.headers['content-type'] as string || 'image/jpeg';

      // Upload to Vercel Blob with random suffix for uniqueness
      const blob = await put(filename, buffer, {
        access: 'public',
        contentType,
        addRandomSuffix: true,
      });

      return res.status(200).json({ url: blob.url });
    } catch (error) {
      console.error('Error uploading photo:', error);
      return res.status(500).json({ error: 'Failed to upload photo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Parse JSON body for DELETE
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      const { url } = JSON.parse(body);
      if (!url) {
        return res.status(400).json({ error: 'Photo URL is required' });
      }
      await del(url);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting photo:', error);
      return res.status(500).json({ error: 'Failed to delete photo' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
} 