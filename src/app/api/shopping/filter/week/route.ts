import { db } from '@/lib/mysql';
import { formatDateForDateSql } from '@/utils/format-date-sql';
import { formatDate } from '@/utils/formate-date';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { QueryFilterSqlProducts } from '@/utils/query-filter-sql-products';
import { QueryFilterSqlVendors } from '@/utils/query-filter-sql-vendor';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const weekOfMonth = searchParams.get('week');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const filterRanking = searchParams.get('ranking');
  const orderRanking = searchParams.get('order');
  const vendorId = searchParams.get('id');

  if (weekOfMonth && month && year) {
    const week = Number(weekOfMonth);
    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const firstDayOfWeek = new Date(firstDayOfMonth);
    firstDayOfWeek.setDate(firstDayOfMonth.getDate() + (week - 1) * 7 - firstDayOfMonth.getDay());

    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      daysOfWeek.push(formatDateForDateSql(date));
    }

    const initialDay = daysOfWeek[0];
    const finalDay = daysOfWeek[6];
    
    const queryFilterProducts = await QueryFilterSqlProducts(initialDay, finalDay, orderRanking ?? '');
    const queryFilterVendor = vendorId !== null ? await QueryFilterSqlVendors(initialDay, finalDay, Number(status), vendorId) : await QueryFilterSqlVendors(initialDay, finalDay, Number(status));
    const queryFilterPurchases = await QueryFilterSql(initialDay, finalDay, status !== null ? status : undefined);
    const querySql = filterRanking === 'products' ? queryFilterProducts : filterRanking === 'vendor' ?  queryFilterVendor : queryFilterPurchases;
    const data: any = await db({ query: querySql });

    const formatData = filterRanking === null || vendorId !== null ? daysOfWeek.map((weekDay: string) => {
      const item = data.find((d: any) => formatDate(new Date(d.date)) === weekDay);
      return {
        date: weekDay,
        total: item ? item.total : 0
      };
    }) : data;

    return NextResponse.json({ data: formatData });
  }

  const currentDay = new Date();
  const initialDayWeek = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - currentDay.getDay());
  const week = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(initialDayWeek);
    date.setDate(initialDayWeek.getDate() + i);
    week.push(formatDateForDateSql(date));
  }

  const initialDay = week[0];
  const finalDay = week[6];
  
  const queryFilterProducts = await QueryFilterSqlProducts(initialDay, finalDay, orderRanking ?? '');
  const queryFilterVendor = vendorId !== null ? await QueryFilterSqlVendors(initialDay, finalDay, Number(status), vendorId) : await QueryFilterSqlVendors(initialDay, finalDay, Number(status));
  const queryFilterPurchases = await QueryFilterSql(initialDay, finalDay, status !== null ? status : undefined);
  const querySql = filterRanking === 'products' ? queryFilterProducts : filterRanking === 'vendor' ?  queryFilterVendor : queryFilterPurchases;
  const data: any = await db({ query: querySql });

  const formatData = filterRanking === null || vendorId !== null ? data.map((item: any) => ({
    date: formatDate(new Date(item.date)),
    total: item.total
  })) : data;

  return NextResponse.json({ data: formatData });
}
