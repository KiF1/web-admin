import { db } from '@/lib/mysql';
import { firstDayInWeek } from '@/utils/first-day-in-week';
import { formatDateForDateSql } from '@/utils/format-date-sql';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { QueryFilterSqlProducts } from '@/utils/query-filter-sql-products';
import { QueryFilterSqlVendors } from '@/utils/query-filter-sql-vendor';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const status = searchParams.get('status');
  const filterRanking = searchParams.get('ranking');
  const orderRanking = searchParams.get('order');
  const vendorId = searchParams.get('id');
  const currentDay = new Date();
  const monthsInYear = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weeksInMonthAndTotalPerWeek = [];
  let initialDay = null;
  let finalDay = null;

  if(month !== null && monthsInYear.indexOf(month) !== -1){
    const monthIndex = monthsInYear.indexOf(month);
    const firstDayInMonth = year !== null ? new Date(Number(year), monthIndex, 1) : new Date(new Date().getFullYear(), monthIndex, 1);;
    const lastDayInMonth = year !== null ? new Date(Number(year), monthIndex + 1, 0) : new Date(new Date().getFullYear(), monthIndex + 1, 0);

    initialDay = formatDateForDateSql(firstDayInMonth);
    finalDay = formatDateForDateSql(lastDayInMonth);
  }else{
    const firstDayInMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    const lastDayInMonth = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0);

    initialDay = formatDateForDateSql(firstDayInMonth);
    finalDay = formatDateForDateSql(lastDayInMonth);
  }

  const queryFilterProducts = await QueryFilterSqlProducts(initialDay, finalDay, orderRanking ?? '');
  const queryFilterVendor = vendorId !== null ? await QueryFilterSqlVendors(initialDay, finalDay, Number(status), vendorId) : await QueryFilterSqlVendors(initialDay, finalDay, Number(status));
  const queryFilterPurchases = await QueryFilterSql(initialDay, finalDay, status !== null ? status : undefined);
  const querySql = filterRanking === 'products' ? queryFilterProducts : filterRanking === 'vendor' ?  queryFilterVendor : queryFilterPurchases;
  const data: any = await db({ query: querySql });
  
  if(filterRanking === null || vendorId !== null){
    const formatData = data.map((item: any) => ({
      date: formatDateForDateSql(new Date(item.date)),
      total: item.total
    }));
  
    for (let i = 0; i < 4; i++) {
    const initialWeek = firstDayInWeek(new Date(new Date(initialDay).getTime() + i * 7 * 24 * 60 * 60 * 1000));
    
    const daysInWeek = [];
    let totalSemana = 0;
  
    for (let j = 0; j < 7; j++) {
      const date = new Date(initialWeek);
      date.setDate(initialWeek.getDate() + j);
      daysInWeek.push(formatDateForDateSql(date));
    }
    
    for (const date of daysInWeek) {
      const dateInWeekArray = formatData.find((item: any) => item.date === date);
      if (dateInWeekArray) {
        totalSemana += dateInWeekArray.total;
      }
    }
  
    if (i === 3) { 
      const lastDayOfFourthWeek = new Date(daysInWeek[6]);
      if (lastDayOfFourthWeek.getDate() !== new Date(finalDay).getDate()) {
        const remainingDays = new Date(finalDay).getDate() - lastDayOfFourthWeek.getDate();
  
        for (let k = 1; k <= remainingDays; k++) {
          const nextDay = new Date(lastDayOfFourthWeek);
          nextDay.setDate(lastDayOfFourthWeek.getDate() + k);
          const nextDayFormatted = formatDateForDateSql(nextDay);
          
          const dateInWeekArray = formatData.find((item: any) => item.date === nextDayFormatted);
          if (dateInWeekArray) {
            totalSemana += dateInWeekArray.total;
          }
        }
      }
    }
  
    weeksInMonthAndTotalPerWeek.push({
      semana: i + 1,
      total: totalSemana
    });
  }
  
    return NextResponse.json({ data: weeksInMonthAndTotalPerWeek });
  }
  
  return NextResponse.json({ data });
} 