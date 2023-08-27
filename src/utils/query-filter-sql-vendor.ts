export function QueryFilterSqlVendors(initialDate: string, finalDate: string, status: number, vendorId?: string){
  const querySql: string = vendorId === undefined ?
  `SELECT vendor.business_name AS name, COUNT(user_order.vendor_id) AS total
    FROM user_orders user_order 
    JOIN vendors vendor 
    ON user_order.vendor_id = vendor.id 
    WHERE user_order.status_id = ${status} AND user_order.created_at BETWEEN '${initialDate} 00:00:00' and '${finalDate} 23:59:59'
    GROUP BY user_order.vendor_id, vendor.business_name
    ORDER BY total DESC LIMIT 10;` : 
    
    `SELECT COUNT(user_order.vendor_id) AS total, DATE(user_order.created_at) AS date
    FROM user_orders user_order
    JOIN vendors vendor ON user_order.vendor_id = vendor.id
    WHERE user_order.vendor_id = ${vendorId}
    AND user_order.status_id = ${status}
    AND user_order.created_at BETWEEN '${initialDate} 00:00:00' and '${finalDate} 23:59:59'
    GROUP BY date;`

  return querySql;
}