import { db } from '@/lib/mysql';
import { formatDateForDateSql } from '@/utils/format-date-sql';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { NextRequest, NextResponse } from 'next/server'
import { Day } from '../../filter/year/route';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const daysOfWeekCurrent = getDaysOfWeek(today);
  const daysOfWeekLast = getDaysOfWeek(lastWeek);

  function getDaysOfWeek(date: Date) {
    const daysOfWeek = [];
    const currentDate = new Date(date);
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - currentDate.getDay() + i);
      daysOfWeek.push(formatDateForDateSql(day));
    }
    return daysOfWeek;
  }


  const querySqlCurrentWeek = await QueryFilterSql(daysOfWeekCurrent[0], daysOfWeekCurrent[6], status !== null ? status : undefined)
  const dataCurrentWeek: any = await db({ query: querySqlCurrentWeek });
  const formatCurrentWeek = dataCurrentWeek.map((item: any) => ({
    date: formatDateForDateSql(new Date(item.date)),
    total: item.total
  }));
  const totalCurrentWeek = formatCurrentWeek.reduce((total: number, day: Day) => total + day.total, 0);

  const querySqlLastWeek = await QueryFilterSql(daysOfWeekLast[0], daysOfWeekLast[6], status !== null ? status : undefined)
  const dataLastWeek: any = await db({ query: querySqlLastWeek });
  const formatLastWeek = dataLastWeek.map((item: any) => ({
    date: formatDateForDateSql(new Date(item.date)),
    total: item.total
  }));
  const totalLastWeek = formatLastWeek.reduce((total: number, day: Day) => total + day.total, 0);

  return NextResponse.json({ current: totalCurrentWeek, last: totalLastWeek });
} 