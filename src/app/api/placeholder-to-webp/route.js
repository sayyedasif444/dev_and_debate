/* eslint-disable */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

  // In a real-world scenario, you would convert the SVG to WebP using sharp or another library
  // For this example, we're just serving the SVG with a WebP content type header
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
} 