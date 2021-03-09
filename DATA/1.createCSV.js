const stringify = require('csv-stringify');
const fs = require('fs')
const csv = require('fast-csv');

async function stringifier(){
    let parsedData = []
    let i = 0
    let n = 0
    const data = fs.readdirSync('./IMOVEIS', {encoding : 'utf-8'})
    let int = setInterval(() => {
        let file = fs.readFileSync('./IMOVEIS/' + data[n])
        csv.parseString(file, {delimiter : "\t"})
        .on('error', (err) => {
            throw new Error(err)
        })
        .on('data', (a) => {
            let x = a[0].split(';')
            if(i == 0 && x[6] == 'TITULAR'){
                parsedData.push(['codigo_imovel','denominacao_imovel','codigo_municipio','municipio','uf','area_total','titular','condicao','percentual_detencao','pais'])
            } else if(x[6] == 'TITULAR' && i != 0){} else {
                parsedData.push([x[0], x[1], x[2], x[3], x[4] , x[5], x[6], x[7], x[8], x[9]])
            }
        })
        .on('end', () => {
            if(i == 0){
                stringify(parsedData, {quoted : true}, (err, output) => {
                    fs.writeFile('CSV.csv', output, () => {})
                })
            } else {
                stringify(parsedData, {quoted : true}, (err, output) => {
                    fs.appendFile('CSV.csv', output, () => {})
                })
            }
            parsedData = []
            console.log(i)
            i++
            if(i == 10){clearInterval(int)}
            n++
        })
    }, 1000);
}
stringifier()

