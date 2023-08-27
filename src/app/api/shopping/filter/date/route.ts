import { db } from '@/lib/mysql';
import { formatDate } from '@/utils/formate-date';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { QueryFilterSqlProducts } from '@/utils/query-filter-sql-products';
import { NextRequest, NextResponse } from 'next/server'
import { QueryFilterSqlVendors } from '../../../../../utils/query-filter-sql-vendor';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const initialDay = searchParams.get('initial')
  const finalDay = searchParams.get('final')
  const filterRanking = searchParams.get('ranking')
  const orderRanking = searchParams.get('order');
  const status = searchParams.get('status')
  const vendorId = searchParams.get('id');

  if(initialDay !== null && finalDay !== null){
    const queryFilterProducts = await QueryFilterSqlProducts(initialDay, finalDay, orderRanking ?? '');
    const queryFilterVendor = vendorId !== null ? await QueryFilterSqlVendors(initialDay, finalDay, Number(status), vendorId) : await QueryFilterSqlVendors(initialDay, finalDay, Number(status));
    const queryFilterPurchases = await QueryFilterSql(initialDay, finalDay, status !== null ? status : undefined);

    const querySql = filterRanking === 'products' ? queryFilterProducts : filterRanking === 'vendor' ?  queryFilterVendor : queryFilterPurchases;
    const data: any = await db({ query: querySql });
    
    if(filterRanking === null || vendorId !== null){
      const formatData = data.map((item: any) => ({
        date: formatDate(new Date(item.date)),
        total: item.total
      }));
  
      return NextResponse.json({ data: formatData });
    }
    
    return NextResponse.json({ data });
  }
  return NextResponse.error()
} 