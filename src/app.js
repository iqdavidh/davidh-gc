
const fnGetRoomFromFile= require('./fnGetDataTxtFile');
const fnGetDisposicion= require('./fnGetDisposicion');
const fnRenderRoom= require('./fnRenderRoom');

//cargar el archivo en linea room.txt y mostrar en consola la respuesta de la posicion de los focos
const roomRaw = fnGetRoomFromFile()

const respuesta=fnGetDisposicion(roomRaw);

const listaRender=fnRenderRoom( respuesta);
listaRender.map(s=>console.log(s));
