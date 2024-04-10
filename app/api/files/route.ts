import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "";
 
  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: 'public',
    });
   
    return NextResponse.json(blob);
  } else {
    return NextResponse.json({message: "No filename detected"});
  }
}
 
export const runtime = 'edge';
 
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url') as string;
  await del(urlToDelete);
 
  return new Response();
}