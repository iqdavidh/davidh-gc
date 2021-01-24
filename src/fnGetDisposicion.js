class Celda {
  
  constructor(valorParedOrEspacio, row, col) {
    this.isEspacio = valorParedOrEspacio === "0";
    this.isRequiereIluminacion = valorParedOrEspacio === "0";
    this.hasFoco = false;
    this.row = row;
    this.col = col;
    
    this.indexLum = 0; //<---- num de celdas total iluminadas que se optienen al poner el foco en esta posicion
  }
  
  setIndexLum(v) {
    this.indexLum = v;
  }
  
  setFoco() {
    this.hasFoco = true;
  }
  
  setTieneIluminacion() {
    this.isRequiereIluminacion = false;
  }
  
}

const fnConvertirRoom = (room) => {
  let listaRows = [];
  let listaCeldas = [];
  
  for (let i = 0; i < room.length; i++) {
    const listaCol = [];
    for (let j = 0; j < room[i].length; j++) {
      const celda = new Celda(room[i][j], i, j);
      listaCol.push(celda);
      if (celda.isRequiereIluminacion) {
        listaCeldas.push(celda);
      }
      
    }
    listaRows.push(listaCol)
  }
  
  return {listaRows, listaCeldas};
}

const fnGetIsRoomIluminado = (listaCeldas) => {
  const listaSinLuz = listaCeldas.filter(k => k.isRequiereIluminacion);
  return listaSinLuz.length === 0;
}

function getNumCeldasEnColumnaIluminadas(listaRows, i, j, isPonerFoco = false) {
  
  const numCols = listaRows[0].length;
  
  let indexColIni = j;
  let isColIniCompleted = false;
  while (!isColIniCompleted) {
    if (indexColIni > 0 && listaRows[i][indexColIni - 1].isEspacio) {
      if (indexColIni > 0) {
        indexColIni--;
        const celdaContinua = listaRows[i][indexColIni];
        isColIniCompleted = !celdaContinua.isEspacio;
      } else {
        isColIniCompleted = true;
      }
    } else {
      isColIniCompleted = true;
    }
  }
  
  let indexColFin = j;
  let isColFinCompleted = false;
  while (!isColFinCompleted) {
    if (indexColFin < (numCols - 1) && listaRows[i][indexColFin + 1].isEspacio) {
      if (indexColFin < numCols) {
        indexColFin++;
        const celdaContinua = listaRows[i][indexColFin];
        isColFinCompleted = !celdaContinua.isEspacio;
      } else {
        isColFinCompleted = true;
      }
    } else {
      isColFinCompleted = true;
    }
    
  }
  
  //numero de celdas en columna que ilum,inaria un foco
  //ver si el rango de columnas  de celdas requiere  iluminacion
  let numColsRequiere = 0;
  for (let index = indexColIni; index <= indexColFin; index++) {
    
    if (isPonerFoco) {
      listaRows[i][index].setTieneIluminacion();
    } else {
      if (listaRows[i][index].isRequiereIluminacion) {
        numColsRequiere++;
      }
    }
    
  }
  return numColsRequiere;
}

function getNumCeldasEnRowIluminadas(listaRows, i, j, isPonerFoco = false) {
  
  const numRows = listaRows.length;
  
  let indexRowIni = i;
  let isRowIniCompleted = false;
  while (!isRowIniCompleted) {
    if (indexRowIni > 0 && listaRows[indexRowIni - 1][j].isEspacio) {
      if (indexRowIni > 0) {
        indexRowIni--;
        const celdaContinua = listaRows[indexRowIni][j];
        isRowIniCompleted = !celdaContinua.isEspacio;
      } else {
        isRowIniCompleted = true;
      }
    } else {
      isRowIniCompleted = true;
    }
    
  }
  
  let indexRowFin = i;
  let isRowFinCompleted = false;
  while (!isRowFinCompleted) {
    if (indexRowFin < (numRows - 1) && listaRows[indexRowFin + 1][j].isEspacio) {
      if (indexRowFin < numRows) {
        indexRowFin++;
        const celdaContinua = listaRows[indexRowFin][j];
        isRowFinCompleted = !celdaContinua.isEspacio;
      } else {
        isRowFinCompleted = true;
      }
    } else {
      isRowFinCompleted = true;
    }
    
  }

  let numRowsRequiere = 0;
  for (let index = indexRowIni; index <= indexRowFin; index++) {
    if (isPonerFoco) {
      listaRows[index][j].setTieneIluminacion();
    } else {
      if (listaRows[index][j].isRequiereIluminacion) {
        numRowsRequiere++;
      }
    }
  }
  return numRowsRequiere;
}

const fnGetDisposicion = (room) => {
  
  //convertir room en celdas
  const {listaRows, listaCeldas} = fnConvertirRoom(room);
  
  
  let isCompleted = false;
  let iteracion = 0; //<--- solo para que en debug no se nos vaya un loop infinito
  
  while (!isCompleted || iteracion === 90) {
    iteracion++;
    
    //agregar un foco
    
    //calcular el index de Ilum a cada celda y ordenarlas de forma desc
    for (let i = 0; i < listaRows.length; i++) {
      for (let j = 0; j < listaRows[i].length; j++) {
        
        let celda = listaRows[i][j];
        
        if (celda.isRequiereIluminacion) {
          let numCeldasCol = getNumCeldasEnColumnaIluminadas(listaRows, i, j);
          let numCeldasRow = getNumCeldasEnRowIluminadas(listaRows, i, j);
          celda.setIndexLum(numCeldasCol + numCeldasRow);
        }
      }
    }
    
    //ORdener por indexLum para optimizar el efecto de un foco
    const listaSort = [...listaCeldas]
      .filter(k => k.isRequiereIluminacion)
      .sort((a, b) => {
        if (a.indexLum === b.indexLum) {
          return 0;
        }
        return a.indexLum > b.indexLum ? -1 : 1
      });
      
    //agregar un foco a la celda con max indexLum
    const celdaOptima = listaSort[0];
    celdaOptima.setFoco();
    
    //afectgar a las celdas que
    getNumCeldasEnColumnaIluminadas(listaRows, celdaOptima.row, celdaOptima.col, true);
    getNumCeldasEnRowIluminadas(listaRows, celdaOptima.row, celdaOptima.col, true);
    
    isCompleted = fnGetIsRoomIluminado(listaCeldas);
    
  }
  return listaRows;
}

module.exports = fnGetDisposicion;