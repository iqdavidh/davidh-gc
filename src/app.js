
const fnGetRoomFromFile= require('./fnGetDataTxtFile');
const fnGetDisposicion= require('./fnGetDisposicion');

//cargar el archivo en linea room.txt y mostrar en consola la respuesta de la posicion de los focos
const roomRaw = fnGetRoomFromFile()

const respuesta=fnGetDisposicion(roomRaw);


