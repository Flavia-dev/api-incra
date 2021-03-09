const fs = require('fs');
const csv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: `${process.cwd()}\\ODS.csv`, 
    header: 
    [{id: 'NR IMOVEL', title: 'NR IMOVEL'}, {id: 'NR INCRA', title: 'NR INCRA'}, {id: 'CEP', title: 'CEP'}],
    fieldDelimiter: ';'
});

let arr = []
let oldPath = './IMOVEIS-ODS';
async function csvInsert(){
    let dirFiles = fs.readdirSync(oldPath)
    for(let i = 0; i < 1; i++){
        await new Promise((res) => {
            csv.parseFile(oldPath + '\\' + dirFiles[i], {delimiter: ',', skipLines:1})
                .on('data', async (row) => { 
                    if(row[2] !== ''){
                        arr.push({
                            'NR IMOVEL': row[0],
                            'NR INCRA': row[2],
                            'CEP': row[9]
                        })    
                    }
                })
                .once('end', () => {
                    res()
                })
            })
            console.log(`[...RUNNING ON FILE NUMBER ${i+1}/1`)
    }
    //console.log(arr)
    csvWriter.writeRecords(arr).then(() => {
        console.log('...Done')
    })
}
csvInsert()