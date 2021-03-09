const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'INCRA',
    password: '',
    multipleStatements: true
  });
const promDb = db.promise();

let csvTable = async () => {
    let sql = `SET GLOBAL local_infile = 1; SET @@local.net_read_timeout=360;
    LOAD DATA INFILE "C:\\\\Users\\\\juan1\\\\Desktop\\\\Projetos\\\\api-incra\\\\DATA\\\\CSV.CSV" INTO TABLE CSV FIELDS TERMINATED BY ',' ENCLOSED BY '"' IGNORE 1 LINES
    (codigo_imovel,denominacao_imovel,codigo_municipio,municipio,uf,area_total,nome_titular,condicao_pessoa,percentual_detencao,pais);`
    await promDb.query(sql).then(result => console.log(result)).catch(error => console.log(error));  
};

let odsTable = async () => {
    let sql = `LOAD DATA INFILE "C:\\\\Users\\\\juan1\\\\Desktop\\\\Projetos\\\\api-incra\\\\DATA\\\\ODS.CSV" INTO TABLE ODS FIELDS TERMINATED BY ';' IGNORE 1 LINES (numero_cafir, codigo_imovel, cep);`
    await promDb.query(sql).then(result => console.log(result)).catch(error => console.log(error));  
}    

let updateIfEquals = async () => {
    try{
      const [rows] = await promDb.query(`SELECT codigo_imovel FROM ODS`) 
      for(let i = 0; i < rows.length; i++){
        let codIMO = rows[i]["codigo_imovel"];
        await promDb.query(`UPDATE CSV,ODS set CSV.numero_cafir = ODS.numero_cafir, CSV.cep = ODS.cep WHERE CSV.codigo_imovel = '${codIMO}' AND ODS.codigo_imovel = '${codIMO}';`)
        console.log(`[...RUNNING ON LINE: ${i}]`)
      }
    } catch(e){ 
      console.log('Erro')
      console.log(e)
      promDb.end()
    }
    promDb.end()
  }

async function Main(){
    await csvTable();
    await odsTable();
    await updateIfEquals();
}
Main();