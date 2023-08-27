export function QueryFilterSql(initialDate: string, finalDate: string, status?: string | undefined){
  const querySql: string = status !== undefined ? 
  `select cast(created_at as date) as date, count(created_at) as total from user_orders where created_at between 
  '${initialDate} 00:00:00' and '${finalDate} 23:59:59' and status_id = ${status} group by date;` 
    : 
  `select cast(created_at as date) as date, count(created_at) as total from user_orders where created_at between 
  '${initialDate} 00:00:00' and '${finalDate} 23:59:59' group by date;` 
  ;
  return querySql;
}