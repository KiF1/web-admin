import { db } from '@/lib/mysql';
import { formatDateForDateSql } from '@/utils/format-date-sql';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const currentDay = new Date();
  const lastSevenDays = [];

  for (let i = 6; i>= 0; i--) {
    const date = new Date(currentDay);
    date.setDate(currentDay.getDate() - i);
    lastSevenDays.push(formatDateForDateSql(date));
  }

  const initialDay = lastSevenDays[0];
  const finalDay = lastSevenDays[6];
  const querySql = await QueryFilterSql(initialDay, finalDay, status !== null ? status : undefined)
  const data: any = await db({ query: querySql });
  const formatData = data.map((item: any) => ({
    date: formatDateForDateSql(new Date(item.date)),
    total: item.total
  }));

    return NextResponse.json({ data: formatData });
} 