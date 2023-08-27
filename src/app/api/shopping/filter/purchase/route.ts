import { db } from '@/lib/mysql';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status');
  const querySql = status !== undefined ? await `SELECT MIN(created_at) AS first, MAX(created_at) AS last FROM user_orders WHERE status_id = ${status}` : await 'SELECT MIN(created_at) AS first, MAX(created_at) AS last FROM user_orders'
  const data: any = await db({ query: querySql });
  const formattedData = data.map((item: any) => {
    const firstDate = new Date(item.first);
    const lastDate = new Date(item.last);
    
    const formattedFirst = `${firstDate.getDate()}-${(firstDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDate.getFullYear()}`;
    const formattedLast = `${lastDate.getDate()}-${(lastDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDate.getFullYear()}`;
    
    return { first: formattedFirst, last: formattedLast };
  });

    return NextResponse.json({ data: formattedData });
} 