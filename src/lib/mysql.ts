import mysql from 'mysql2/promise'; // Certifique-se de ter o pacote mysql2 instalado

export async function db({ query = '' }) {
  const dbconnection = await mysql.createConnection({
    host: 'mumu-delivery-replica-read.cz6d8pnzbpc9.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Calopsita9494',
    database: 'mumudb',
    port: 3306
  });

  // const dbconnection = await mysql.createConnection({
  //   host: '168.100.8.196',
  //   user: 'root',
  //   password: 'Calopsita9494@@',
  //   database: 'db',
  //   port: 3306
  // });

  try {
    const [results] = await dbconnection.execute(query);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log('Erro na conexão do bd')
  }
}
