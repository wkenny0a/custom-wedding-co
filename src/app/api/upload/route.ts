import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Must be false for uploads
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

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
