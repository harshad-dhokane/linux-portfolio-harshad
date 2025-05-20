import express from 'express';
import path from 'path';
import app from '../server/index';

// Serve static files from the dist/public directory
app.use(express.static(path.join(process.cwd(), 'dist/public')));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
  }
});

export default app;