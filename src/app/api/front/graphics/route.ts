import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server'

interface TotalCurrentWeek{
  current: number;
  last: number;
}

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);

  const responseLastSevenDaysTotal = await axios.get(`${origin}/api/shopping/filter/last`)
  const totalLastSevenDaysTotal = responseLastSevenDaysTotal.data.data;

  const responseLastSevenDaysAccept = await axios.get(`${origin}/api/shopping/filter/last?status=2`);
  const totalLastSevenDaysAccept = responseLastSevenDaysAccept.data.data;

  const responseLastSevenDaysPending = await axios.get(`${origin}/api/shopping/filter/last?status=3`);
  const totalLastSevenDaysPending = responseLastSevenDaysPending.data.data;

  const responseLastSevenDaysFinalized = await axios.get(`${origin}/api/shopping/filter/last?status=4`);
  const totalLastSevenDaysFinalized = responseLastSevenDaysFinalized.data.data;

  const responseLastSevenDaysCanceled = await axios.get(`${origin}/api/shopping/filter/last?status=5`);
  const totalLastSevenDaysCanceled = responseLastSevenDaysCanceled.data.data;

  const boxGraphicsArray = [
    {
      name: "Pedidos Cadastros",   
      value: totalLastSevenDaysTotal
    },
    {
      name: "Pedidos Aceitos",
      value: totalLastSevenDaysAccept,
    },
    {
      name: "Pedidos Pendentes",
      value: totalLastSevenDaysPending,
    },
    {
      name: "Pedidos Finalizados",
      value: totalLastSevenDaysFinalized,
    },
    {
      name: "Pedidos Cancelados",
      value: totalLastSevenDaysCanceled,
    }
  ]

  return NextResponse.json({ data: boxGraphicsArray });
}