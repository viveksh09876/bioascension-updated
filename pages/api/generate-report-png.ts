import type { NextApiRequest, NextApiResponse } from 'next';
import { generateFancyPng } from '../../lib/generateFancyPng';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { analysis, name, isFreeUser } = req.body;

    if (!analysis) {
      return res.status(400).json({ error: 'Analysis is required' });
    }

    // Extract first name for personalization
    const firstName = name ? name.split(' ')[0] : null;
    
    // Generate fancy PNG with analysis content - now returns buffer
    const pngBuffer = await generateFancyPng({
      text: analysis,
      subheading: isFreeUser ? 'Free Analysis Report' : 'Complete Analysis Report',
      logoPath: process.cwd() + '/public/logo/logo.png',
      userName: firstName
    });

    // Verify the PNG buffer was created
    if (!pngBuffer || pngBuffer.length === 0) {
      return res.status(500).json({ error: 'Failed to generate PNG' });
    }

    // Set response headers for PNG download
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="heightmax-report.png"');
    res.setHeader('Content-Length', pngBuffer.length.toString());
    
    return res.status(200).send(pngBuffer);
  } catch (error) {
    console.error('PNG generation error:', error);
    return res.status(500).json({ error: 'Failed to generate PNG' });
  }
} 