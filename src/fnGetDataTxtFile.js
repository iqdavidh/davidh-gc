const fs = require('fs')
const  path = require('path');


/***
 * A partir del txt lo convertimois en un modelo rooom
 */
const fnGetDataTxtFile =()=>{
  const p = path.join(__dirname, '../', 'room.txt');
  //convertir cada linea en un array de celdas
  const room= fs.readFileSync(p, 'utf8')
  const lineas = room.split("\n")
  
  const listaClean =lineas.map( item=>{
     return item.split('').filter(k=>k==="1"||k==="0" );
  });
  
  return listaClean;

}

module.exports =fnGetDataTxtFile;