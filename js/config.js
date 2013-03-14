//var plataforma = "android";
var plataforma = "iphone";
var ruta = new Array();
var directorio;
var device_ready;
var raiz;
switch(plataforma){
case "web":
	 raiz = 'http://barcelonainmypocket.com/jordi/j/';
	directorio= "http://barcelonainmypocket.com/jordi/j/imagenes/";
	ruta['comentarios']= raiz + 'html/comentarios.html';
	ruta['menu']= raiz + 'index.html';
	ruta['ficha_detalle']= raiz + 'html/ficha.html';
	ruta['bred'] =  raiz + 'html/bred.html';
	ruta['orgTurex'] = raiz + 'html/orgTurex.html';
	device_ready = "DOMContentLoaded";//"beforeload"
break;
case "iphone":
    raiz = "";//getRaiz();
	directorio= raiz + "../imagenes/";
	ruta['comentarios']= raiz + 'comentarios.html';
 	ruta['menu']= raiz +'index.html';
 	ruta['ficha_detalle']= raiz + 'ficha.html';
 	ruta['bred'] = raiz + 'bred.html';
 	ruta['orgTurex'] = raiz + 'html/orgTurex.html';
    ruta['orgServicios'] = raiz + 'orgServicios.html';
    ruta['servicioDetalle'] = raiz + 'servicioDetalle.html';
 	device_ready = "deviceready";
break;
case "android":	
 	raiz ="file:///android_asset/www/";
	directorio= raiz + "imagenes/";
	ruta['comentarios']= raiz + 'html/comentarios.html';
 	ruta['menu']= raiz +'index.html';
 	ruta['ficha_detalle']= raiz + 'html/ficha.html';
 	ruta['bred'] = raiz + 'html/bred.html';
 	ruta['orgTurex'] = raiz + 'html/orgTurex.html';
 	device_ready = "deviceready";
break;
}
var c_path= new Array();

//Graficos de los botones que activan los filtros;
c_path['botones']= directorio + 'iconos/botones_filtros/';
//Graficos de los mapas
c_path['mapa']=directorio + 'mapa/';
//piezas especiales de mosaico
c_path['mosaico']=directorio + 'mosaico/';
//fondos y complementos como relevancia y oks y cancels
c_path['popup']=directorio + 'popup/';
//iconos de los extras
c_path['qm']=directorio + 'quickmap/';
//iconos de los extras
c_path['extras']=directorio + 'iconos/extras/';

//ratings y estrellas verticales y horizontales
c_path['rating_h']=directorio + 'iconos/ratings/horizontal/';
c_path['rating_v']=directorio + 'iconos/ratings/vertical/';
c_path['estrellas']=directorio + 'iconos/ratings/estrellas/';
c_path['ficha_resumen']=directorio + 'ficha_resumen/';
//ficha detalle
c_path['ficha']=directorio + 'ficha/';
c_path['decoracion']=directorio + 'decoracion/';
c_path['extras']=directorio + 'iconos/extras/cuadrado/';
c_path['mapa_pequeno']=directorio + 'mapa_pequeno/';
c_path['extras_blanco']=directorio + 'iconos/extras/blanco/';
c_path['extras_color']=directorio + 'iconos/extras/color/';
c_path['categorias']=directorio + 'iconos/categorias/';
c_path['promociones']=directorio + 'promociones/';
c_path['horarios']=directorio + 'horarios/';
c_path['instrucciones']=directorio + 'instrucciones/';
//comentarios
c_path['comentarios'] = directorio + 'comentarios/';
c_path['imagenes_usuario'] = directorio + 'comentarios/';
c_path['iconos_comentarios'] = directorio + 'comentarios/';
c_path['comentarios_iconos_categorias'] = directorio + 'comentarios/iconos/';

c_path['servicios']=directorio + 'servicios/';
c_path['servicios_bg']=directorio + 'servicios/bg/';
c_path['servicios_iconos']=directorio + 'servicios/iconos/';
c_path['servicios_fotos']=directorio + 'servicios/fotos/';
c_path['servicios_detalles']=directorio + 'servicios/detalles';
c_path['servicios_banner']=directorio + 'servicios/banner/';


c_path['rotulos']='http://www.barcelonainmypocket.com/contenidos_produccion/prv/upload_banner_thumb/';
c_path['fotos']='http://www.barcelonainmypocket.com//contenidos_produccion/prv/upload_gallery_thumb/';
c_path['productos']='http://www.barcelonainmypocket.com/contenidos_produccion/prv/upload_product_thumb/';
c_path['turex']=directorio + 'turex/';
c_path['menu']=directorio + 'menu/';
c_path['loading']=directorio + 'loading/';
c_path['console']=directorio + 'console/';

var ws =new Array();
ws['filtros']='http://www.barcelonainmypocket.com/desarrollo/ws/filters8.php';
ws['cardList']='http://www.barcelonainmypocket.com/desarrollo/ws/cardlist10.php';
ws['menu']='http://www.barcelonainmypocket.com/desarrollo/ws/menuws.php';
ws['menu_beta']='http://www.barcelonainmypocket.com/desarrollo/ws/menubetaws.php';
ws['card'] = 'http://www.barcelonainmypocket.com/desarrollo/ws/card7.php';
ws['add_comentario']="http://www.barcelonainmypocket.com/desarrollo/ws/comentarios/insertarComentario2.php";
ws['comentarios']="http://www.barcelonainmypocket.com/desarrollo/ws/comentarios/comentariosB.php";
ws['votar_comentario']="http://www.barcelonainmypocket.com/desarrollo/ws/comentarios/votarComentario.php"
ws['rutas']="http://www.barcelonainmypocket.com/desarrollo/ws/rutasws.php";
ws['filtrosB']='http://www.barcelonainmypocket.com/desarrollo/ws/filters7.php';
ws['cardListB']='http://www.barcelonainmypocket.com/desarrollo/ws/cardlist4.php';

ws['servicios']="http://www.barcelonainmypocket.com/desarrollo/ws/servicios/serviciosws.php";
ws['servicioDetalle']="http://www.barcelonainmypocket.com/desarrollo/ws/servicios/servicioDetallews.php";
ws['reservaServicio']="http://www.barcelonainmypocket.com/desarrollo/ws/reservaws.php";
ws['disponibilidadProducto']="http://www.barcelonainmypocket.com/desarrollo/ws/prv/calendario_disponibilidad_ws.php";
ws['disponibilidad']="http://www.barcelonainmypocket.com/desarrollo/ws/prd/disponibilidadws.php";






/*

*/
var fichas_iniciales=5;
var fichas_mas=5;
var iFicha=0;
function getRaiz(){
  var url = window.location.href;
  var raiz = url.slice(0,url.indexOf("www/"));
  raiz = raiz + "www/";
  return raiz;
}
