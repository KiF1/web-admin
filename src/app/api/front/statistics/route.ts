import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server'

interface TotalCurrentWeek{
  current: number;
  last: number;
}

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);

  const responseCountTotal = await axios.get(`${origin}/api/shopping/count/total`)
  const totalShopping = responseCountTotal.data.total;

  const responseShoppingCurrentWeekTotal = await axios.get(`${origin}/api/shopping/count/week`)
  const totalShoppingCurrentWeekTotal: TotalCurrentWeek = responseShoppingCurrentWeekTotal.data;

  const responseCountAccept = await axios.get(`${origin}/api/shopping/count/total?status=2`);
  const totalShoppinAccept = responseCountAccept.data.total;

  const responseShoppingCurrentWeekAccept = await axios.get(`${origin}/api/shopping/count/week?status=2`)
  const totalShoppingCurrentWeekAccept: TotalCurrentWeek = responseShoppingCurrentWeekAccept.data;

  const responseCountPending = await axios.get(`${origin}/api/shopping/count/total?status=3`)
  const totalShoppingPending = responseCountPending.data.total;

  const responseShoppingCurrentWeekPending = await axios.get(`${origin}/api/shopping/count/week?status=3`)
  const totalShoppingCurrentWeekPending: TotalCurrentWeek = responseShoppingCurrentWeekPending.data;

  const responseCountFinalized = await axios.get(`${origin}/api/shopping/count/total?status=4`);
  const totalShoppingFinalized = responseCountFinalized.data.total;

  const responseShoppingCurrentWeekFinalized = await axios.get(`${origin}/api/shopping/count/week?status=4`)
  const totalShoppingCurrentWeekFinalized: TotalCurrentWeek = responseShoppingCurrentWeekFinalized.data;

  const responseCountCanceled = await axios.get(`${origin}/api/shopping/count/total?status=5`);
  const totalShoppingCanceled = responseCountCanceled.data.total;

  const responseShoppingCurrentWeekCanceled = await axios.get(`${origin}/api/shopping/count/week?status=5`)
  const totalShoppingCurrentWeekCanceled: TotalCurrentWeek = responseShoppingCurrentWeekCanceled.data;

  const boxStatisticsArray = [
    {
      name: "Pedidos Cadastros",   
      value: totalShopping, 
      icon: "UserCheck2", 
      currentTotal: totalShoppingCurrentWeekTotal?.current, 
      lastTotal: totalShoppingCurrentWeekTotal?.last 
    },
    {
      name: "Pedidos Aceitos",
      value: totalShoppinAccept,
      icon: "UtensilsCrossed",
      currentTotal: totalShoppingCurrentWeekAccept?.current, 
      lastTotal: totalShoppingCurrentWeekAccept?.last 
    },
    {
      name: "Pedidos Pendentes",
      value: totalShoppingPending,
      icon: "Bike",
      currentTotal: totalShoppingCurrentWeekPending?.current, 
      lastTotal: totalShoppingCurrentWeekPending?.last 
    },
    {
      name: "Pedidos Finalizados",
      value: totalShoppingFinalized,
      icon: "PackageCheck",
      currentTotal: totalShoppingCurrentWeekFinalized?.current, 
      lastTotal: totalShoppingCurrentWeekFinalized?.last 
    },
    {
      name: "Pedidos Cancelados",
      value: totalShoppingCanceled,
      icon: "XCircle",
      currentTotal: totalShoppingCurrentWeekCanceled?.current, 
      lastTotal: totalShoppingCurrentWeekCanceled?.last 
    }
  ]

  return NextResponse.json({ data: boxStatisticsArray });
}