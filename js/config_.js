var plataforma = "web";
//var plataforma = "app";
var ruta = new Array();
var directorio;
var device_ready;
var raiz;
if(plataforma == "web"){
    raiz = 'http://www.barcelonainmypocket.com/appMarcos/html/'
	directorio= "http://www.barcelonainmypocket.com/martin/produccionbeta/app/imagenes/";
	ruta['comentarios']= raiz + 'comentarios.php';
	ruta['menu']= raiz + 'menu.php';
	ruta['ficha_detalle']= raiz + 'ficha.php';
	ruta['bred'] =  raiz + 'bred.php';
	device_ready = "DOMContentLoaded";//"beforeload";
}else{
    raiz = getRaiz();
	directorio= raiz + "/imagenes/";
	ruta['comentarios']= raiz + 'html/comentarios.html';
 	ruta['menu']= raiz +'index.html';
 	ruta['ficha_detalle']= raiz + 'html/ficha.html';
 	ruta['bred'] = raiz + 'html/bred.html';
 	device_ready = "deviceready";
}

var c_path= new Array();

//Graficos de los botones que activan los filtros;
c_path['botones']= directorio + 'iconos/botones_filtros/';
// Graficos de los mapas
c_path['mapa']=directorio + 'mapa/';
// piezas especiales de mosaico
c_path['mosaico']=directorio + 'mosaico/';
// fondos y complementos como relevancia y oks y cancels
c_path['popup']=directorio + 'popup/';
// iconos de los extras
c_path['qm']=directorio + 'quickmap/';
// iconos de los extras
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
c_path['extras_blanco']=directorio + 'iconos/extras/blanco/';
c_path['extras_color']=directorio + 'iconos/extras/color/';
c_path['categorias']=directorio + 'iconos/categorias/';
//comentarios
c_path['comentarios'] = directorio + 'comentarios/';
c_path['imagenes_usuario'] = directorio + 'comentarios/';
c_path['iconos_comentarios'] = directorio + 'comentarios/';
c_path['comentarios_iconos_categorias'] = directorio + 'comentarios/iconos/';

c_path['rotulos']='http://www.barcelonainmypocket.com/contenidos/prv/upload_banner_thumb/';
c_path['fotos']='http://www.barcelonainmypocket.com//contenidos/prv/upload_gallery_thumb/';
c_path['productos']='http://www.barcelonainmypocket.com/martin/produccionbeta/contenidos/prv/upload_product_thumb/';

c_path['menu']=directorio + 'menu/';
var ws =new Array();
ws['filtros']='http://www.barcelonainmypocket.com/desarrollo/ws/filters6.php';
ws['cardList']='http://www.barcelonainmypocket.com/desarrollo/ws/cardlist4.php';
ws['menu']='http://www.barcelonainmypocket.com/desarrollo/ws/menuws.php';
ws['card'] = 'http://www.barcelonainmypocket.com/desarrollo/ws/card4.php';
ws['add_comentario']="http://www.barcelonainmypocket.com/desarrollo/ws/comentarios/addComentario.php";
ws['comentarios']="http://www.barcelonainmypocket.com/desarrollo/ws/comentarios/comentariosA.php";

ws['filtrosB']='http://www.barcelonainmypocket.com/desarrollo/ws/filters6.php';
ws['cardListB']='http://www.barcelonainmypocket.com/desarrollo/ws/cardlist4.php';





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
