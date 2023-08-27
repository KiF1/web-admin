import { db } from '@/lib/mysql';
import { formatDateForDateSql } from '@/utils/format-date-sql';
import { QueryFilterSql } from '@/utils/query-filter-sql';
import { QueryFilterSqlProducts } from '@/utils/query-filter-sql-products';
import { QueryFilterSqlVendors } from '@/utils/query-filter-sql-vendor';
import { NextRequest, NextResponse } from 'next/server'

export interface Day{
  date: string,
  total: string
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status');
  const year = searchParams.get('year');
  const filterRanking = searchParams.get('ranking');
  const orderRanking = searchParams.get('order');
  const vendorId = searchParams.get('id');
  
  const yearSelected = year !== null ? Number(year) : new Date().getFullYear();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const initialDayInYear = year !== null ? formatDateForDateSql(new Date(Number(year), 0, 1)) : formatDateForDateSql(new Date(yearSelected, 0, 1));;
  const finalDayInYear = year !== null ? formatDateForDateSql(new Date(Number(year), 11, 31)) : formatDateForDateSql(new Date(yearSelected, 11, 31));

  function calcTotalInMonth(arrayDates: Day[]) {
    return arrayDates.reduce((total, day) => total + Number(day.total), 0);
  }
  
  function formatToArrayOfMonthsInYear(arrayDates: Day[], yearSelected: string) {
    return months.map((nameMonth, indexMonth) => {
      const totalMonth = calcTotalInMonth(arrayDates.filter(day => {
        const [year, month] = day.date.split('-');
        return year === yearSelected && parseInt(month) === (indexMonth + 1);
      }));
  
      return { mes: nameMonth, total: totalMonth };
    }).filter(mes => mes.total > 0);
  }

  const queryFilterProducts = await QueryFilterSqlProducts(initialDayInYear, finalDayInYear, orderRanking ?? '');
  const queryFilterVendor = vendorId !== null ? await QueryFilterSqlVendors(initialDayInYear, finalDayInYear, Number(status), vendorId) : await QueryFilterSqlVendors(initialDayInYear, finalDayInYear, Number(status));  
  const queryFilterPurchases = await QueryFilterSql(initialDayInYear, finalDayInYear, status !== null ? status : undefined);

  const querySql = filterRanking === 'products' ? queryFilterProducts : filterRanking === 'vendor' ?  queryFilterVendor : queryFilterPurchases;
  const data: any = await db({ query: querySql });
  
  const formatData =  data.map((item: any) => ({
    date: formatDateForDateSql(new Date(item.date)),
    total: item.total
  }));

  const arrayFormated = filterRanking === null || vendorId !== null ? formatToArrayOfMonthsInYear(formatData, String(yearSelected)) : data;

  return NextResponse.json({ data: arrayFormated });
} 