import { db } from '@/lib/mysql';
import { NextResponse } from 'next/server'

export async function GET() {
  const querySql: string ="SELECT id, business_name AS name FROM vendors;"
  const data: any = await db({ query: querySql });

  return NextResponse.json({ data });
} 