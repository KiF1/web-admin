import { db } from '@/lib/mysql';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const querySql: string = status !== null ? `SELECT count(*) FROM mumudb.user_orders where status_id = ${status}` : "SELECT count(*) FROM mumudb.user_orders";
  const data: any = await db({ query: querySql });
  const value = data !== undefined ? data[0]['count(*)'] : null;

  return NextResponse.json({ 'total': value });
} 