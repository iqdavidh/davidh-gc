const fnRenderRoom = (lista) => {
  
  const listaRender = [];
  
  for (let i = 0; i < lista.length; i++) {
    let texto = '';
    for (let j = 0; j < lista[i].length; j++) {
      const celda = lista[i][j];
      if (celda.isEspacio) {
        texto += celda.hasFoco ? "F" : "0"
      } else {
        //pared
        texto += "1";
      }
    }
    
    listaRender.push(texto);
  }
  
  return listaRender
}


module.exports = fnRenderRoom;