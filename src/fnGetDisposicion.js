class Celda {
  
  constructor(valorParedOrEspacio, row, col) {
    this.isEspacio = valorParedOrEspacio === "0";
    this.isRequiereIluminacion = valorParedOrEspacio === "0";
    this.hasFoco = false;
    this.row = row;
    this.col = col;
    
    this.indexLum = 0; //<---- num de celdas total iluminadas que se optienen al poner el foco en esta posicion
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

function getNumCeldasEnColumnaIluminadas(listaRows, i, j) {
  
  const numCols = listaRows[0].length;
  
  //buscar en eje x / columna
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
    if (listaRows[i][index].isRequiereIluminacion) {
      numColsRequiere++;
    }
  }
  return numColsRequiere;
}

const fnGetDisposicion = (room) => {
  
  //convertir room en celdas
  const {listaRows, listaCeldas} = fnConvertirRoom(room);
  

  
  
  let isCompleted = false;
  let iteracion = 0;
  
  while (!isCompleted || iteracion === 50) {
    iteracion++;
    
    //agregar un foco
    {
      //calcular el index de Ilum a cada celda y ordenarlas de forma desc
      for (let i = 0; i < listaRows.length; i++) {
        for (let j = 0; j < listaRows[i].length; j++) {
          
          let celda = listaRows[i][j];
          
          if (celda.isEspacio) {
            let index = getNumCeldasEnColumnaIluminadas(listaRows, i, j);
  
            //ilumnar por renmglon ----------------------------
            
            const x=0;
          }
          
          
        }
      }
    }
    
    
    let isCompleteted = fnGetIsRoomIluminado(listaCeldas)
    
    
  }
  
}

module.exports = fnGetDisposicion;