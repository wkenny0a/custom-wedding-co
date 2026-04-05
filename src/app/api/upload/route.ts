import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import swellNode from 'swell-node';
const swell = swellNode.swell;

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Must be false for uploads
});

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID!,
  process.env.NEXT_PUBLIC_SWELL_SECRET_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const cartId = formData.get('cartId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    if (!cartId) {
      return NextResponse.json(
        { error: 'Missing active Swell Cart session ID. Uploads are strictly tied to active carts.' },
        { status: 403 }
      );
    }

    // Ping Swell to aggressively verify this is a real Cart session
    try {
      const cart: any = await swell.get('/carts/{id}', { id: cartId });
      if (!cart || !cart.id) {
        throw new Error('Invalid Cart');
      }
    } catch (e) {
      return NextResponse.json(
        { error: 'Forbidden. The provided Cart ID is invalid or expired. Bot traffic detected.' },
        { status: 403 }
      );
    }

    // --- SECURITY VALIDATION ---
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.' },
        { status: 415 }
      );
    }

    // Hard backend limit of 4.5MB (4.5 * 1024 * 1024) to match Vercel Serverless limits and protect Sanity storage
    if (file.size > 4718592) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is ~4.5MB.' },
        { status: 413 }
      );
    }
    // ---------------------------

    // Convert the file to an ArrayBuffer, then a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine asset type (image vs file)
    const assetType = file.type.startsWith('image/') ? 'image' : 'file';

    // Upload to Sanity
    const asset = await sanityClient.assets.upload(assetType, buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({ url: asset.url, id: asset._id }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'Error uploading file' },
      { status: 500 }
    );
  }
}
