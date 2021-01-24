const fnGetDisposicion= require('./fnGetDisposicion');
const fnRenderRoom= require('./fnRenderRoom');

describe('fnGetDisposicion', function () {
  
  it('should - resolver room de 3x3', function () {
    
    const room=["000","000","000"];
    const respuesta= fnGetDisposicion(room)
  
    const listaRender=fnRenderRoom( respuesta);
    const texto=listaRender.join('');
    const textoEsperado="F000F000F";
    expect(texto).toBe(textoEsperado);
    
  });
});