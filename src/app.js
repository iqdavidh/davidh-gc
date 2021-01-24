
const fnGetRoomFromFile= require('./fnGetDataTxtFile');
const fnGetDisposicion= require('./fnGetDisposicion');
const fnRenderRoom= require('./fnRenderRoom');

//cargar el archivo en linea room.txt y mostrar en consola la respuesta de la posicion de los focos
const roomRaw = fnGetRoomFromFile()

const respuesta=fnGetDisposicion(roomRaw);

//Muestra de resultado -------------------
const listaRender=fnRenderRoom( respuesta);
listaRender.map(s=>console.log(s));


//los resultamos se meustran con un string indicando 0/1 para espacio o parefd y en caso de ser
// espacio que tenga un foco se mostrará F

