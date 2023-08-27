export function QueryFilterSqlProducts(initialDate: string, finalDate: string, order: string){
  const querySql: string = 
  `SELECT p.id, p.name, p.image, COUNT(*) as total_sales, v.business_name as vendor
  FROM user_orders uo 
  INNER JOIN user_ordered_items uoi ON uoi.order_id = uo.id 
  INNER JOIN products p ON uoi.product_id = p.id 
  INNER JOIN vendors v ON p.vendor_id = v.id
  WHERE v.business_name != 'Lojinha de testes' AND uo.created_at >= timestamp('${initialDate} 00:00:00') AND uo.created_at <= timestamp('${finalDate} 23:59:59')
  GROUP BY p.id, p.name, p.image, v.business_name
  ORDER BY total_sales ${order} LIMIT 10;  
  `

  return querySql;
}