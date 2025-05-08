// api/index.ts
import express, { Request, Response } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Express is running on Vercel!');
});

// Export as a Vercel handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any); // Bridge express with Vercel
}
