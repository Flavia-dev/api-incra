import mysql from 'mysql2/promise'
var conPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'INCRA',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: '0'
})

// var con = mysql.createConnection(obj);

export default class Controller

{
    async getProductorByCode(ctx)
    {   
        let toReturn = await conPool.query(`SELECT convert(CSV.codigo_imovel, char) as 'codigo_imovel', CSV.denominacao_imovel, CSV.codigo_municipio, CSV.municipio, CSV.uf, CSV.area_total, CSV.nome_titular, CSV.condicao_pessoa, CSV.percentual_detencao, CSV.pais, CSV.numero_cafir, CSV.cep
        FROM CSV WHERE codigo_imovel = ?`, ctx.params["codigoImovel"])
        if(toReturn[0].length > 0){
            ctx.body = toReturn[0]
        } else {
            ctx.body = 'Codigo não encontrado'
            ctx.status = 404
        }
    }
    async getProductorByName(ctx)
    {   
        let toReturn = await conPool.query(`select convert(codigo_imovel, char) as codigo_imovel,denominacao_imovel,codigo_municipio,uf,municipio,area_total,nome_titular,condicao_pessoa,percentual_detencao,pais,numero_cafir,cep from CSV where match(nome_titular) against ('"${ctx.params["nome"]}"' in boolean mode)`)
        if(toReturn[0].length > 0){
            ctx.body = toReturn[0];
        } else {
            ctx.body = 'Codigo não encontrado'
            ctx.status = 400
        }
    }
}



// if((/[A-Z]/gi)){
//     window.open(`http://localhost:8080/get_nome/${id}`)
// }

// if((/^[0-9]+$/)){
//     window.open(`http://localhost:8080/get_imovel/${id}`) 
// }