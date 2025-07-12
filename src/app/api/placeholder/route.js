import { NextResponse } from 'next/server';

// Required for static export
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  // Create a simple SVG placeholder image
  const width = 800;
  const height = 600;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#9A7D0A" />
      <text x="50%" y="50%" font-family="Arial" font-size="32" fill="white" text-anchor="middle" alignment-baseline="middle">
        Sample Blog Image
      </text>
    </svg>
  `;

  // Convert SVG to base64
  const base64 = Buffer.from(svg).toString('base64');
  
  return new NextResponse(`data:image/svg+xml;base64,${base64}`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 