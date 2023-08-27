import { db } from '@/lib/mysql';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status');

  const querySql: string = 
  ` SELECT vendor.business_name AS loja, vendor.phone,
    COUNT(user_order.vendor_id) AS total,  
    CONCAT(vendor.address, ', ', vendor.complement) AS informacoes 
    FROM user_orders user_order 
    JOIN vendors vendor 
    ON user_order.vendor_id = vendor.id 
    WHERE user_order.status_id = ${status} 
    GROUP BY user_order.vendor_id, vendor.business_name, vendor.address, vendor.complement, vendor.phone 
    ORDER BY total DESC LIMIT 10;`  
  const data: any = await db({ query: querySql });
  
  return NextResponse.json({ data });
} 