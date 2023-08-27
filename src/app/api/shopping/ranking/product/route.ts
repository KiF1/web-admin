import { db } from '@/lib/mysql';
import { NextResponse } from 'next/server'

export async function GET() {
  const querySql: string = 
  `SELECT  product.id, product.name, product.image, ranks.count AS vendas, vendor.business_name AS loja
   FROM mumudb.products product
   JOIN (SELECT product_id, COUNT(*) as count  FROM mumudb.user_ordered_items GROUP BY product_id) as ranks 
   ON product.id = ranks.product_id
   JOIN mumudb.vendors vendor 
   ON product.vendor_id = vendor.id
   WHERE vendor.business_name != 'Lojinha de testes'
   ORDER BY vendas DESC LIMIT 10;`
  const data: any = await db({ query: querySql });
  const newData = data.map((item: any) => ({
    ...item,
    image: `https://imagemumu.imgix.net/${item.image}`
  }));

  return NextResponse.json({ data: newData });
} 