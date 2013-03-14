		
function guardaAccion(accion,pagina){
    var posicion =   eval('(' + getJsonPosition() + ')');
    oAccion.nueva_accion = accion;
    oAccion.pagina_accion = pagina;
    oAccion.latitud = posicion.coords.latitude;
    oAccion.longitud = posicion.coords.longitude;
    listaAcciones.push(oAccion);
    oAccion = new accionesPagina();
}

function accionesPagina(){
    this.nueva_accion;
    this.pagina_accion;
    this.latitud;
    this.longitud;
}

function replaceSubstring(inSource, inToReplace, inReplaceWith) {
    
    var outString = inSource;
    while (true) {
        var idx = outString.indexOf(inToReplace);
        if (idx == -1) {
            break;
        }
        outString = outString.substring(0, idx) + inReplaceWith +
        outString.substring(idx + inToReplace.length);
    }
    return outString;
    
}

function getRating(rating,nombre_clase){
                var elemento_rating=crear_elemento_html('section',nombre_clase);		
                for(r=0;r<5;r++){
                    if(rating>=1){
                        addEstrella(elemento_rating,5);
                        rating-=1;
                    } else if (rating>=0.8){
                        addEstrella(elemento_rating,4);
                        rating-=0.8;
                    }else if (rating>=0.6){
                        addEstrella(elemento_rating,3);
                        rating-=0.6;
                    }else if (rating>=0.4){
                        addEstrella(elemento_rating,2);
                        rating-=0.4;
                    }else if (rating>=0.2){
                        addEstrella(elemento_rating,1);
                        rating-=0.2;
                    }else{
                        addEstrella(elemento_rating,0);
                    }	
                }	
                alinear(elemento_rating);
                return elemento_rating;
            }
            function addEstrella(padre,puntas){
                
                var estrella=crear_elemento_html('section','estrella', 'estrella_'+puntas);
                addBg(estrella,c_path['estrellas']+'estrella_'+puntas+'.png');
                padre.appendChild(estrella);	
            }	
         
function onBackKeyDown() {
	//print_console('accion:'+backKeyAction);
		switch(backKeyAction){
			case 'exit':
				navigator.app.exitApp();	
			break;
			case 'back':
				backKeyAction='exit';
				//print_console('cargada:'+backKeyAction);
				irA('menu',0);
			break;
			case 'back2bred':
				backKeyAction='exit';
				//print_console('cargada:'+backKeyAction);
				irA('bred');
			break;
			case 'cerrar_galeria_mapa':
				cerrarMapa();
				cerrarGaleria();
			break;
			case 'cerrar_popup':
			
				 for (var i = 0; i < 10; i++) {
					 cerrarPopup(i);
				    }
				 
				 //print_console('cargada:'+backKeyAction);
			break;
			
			case 'cerrar_quicks':
				
				 ocultarGaleria();
				 ocultar_qm();
				 //print_console('cargada:'+backKeyAction);
			break;
			case 'cerrar_spinwheel':
				
				SpinningWheel.close();
				cancel();
				//print_console('cargada:'+backKeyAction);
			break;
		}
		
		 
     }


function deteccionPantalla(){
    //   	  //print_console("Detectando pantalla..");
          	  ancho = $(window).width();
                altura = $(window).height();
      //          //print_console("Ancho pantalla: "+ancho+"px");
      //          //print_console("Altura pantalla: "+altura+"px");
                if(ancho<1 || altura<1 || ancho<altura){
      //          	 //print_console("Pantalla no detectada"); 
                 	deteccionPantalla();
                }
            }

function getUrlParametros(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function crear_elemento_html(tipo,clase,id,texto,onclick_function,onload_function){
    var elemento = document.createElement(tipo);
    if (typeof clase != 'undefined') {
        elemento.className = clase;
    }
    if (typeof id != 'undefined') {
        elemento.id = id;
    }
    if (typeof texto != 'undefined') {
        elemento.innerHTML = texto;
    }  		
    if (typeof onclick_function != 'undefined') {
        elemento.setAttribute("onclick",onclick_function);
    } 
    if (typeof onload_function != 'undefined') {
        elemento.setAttribute("onload",onload_function);
    } 
    return elemento;
}

function crear_elemento_html_formulario(tipo,clase,id,texto,nombre){
    var elemento = document.createElement(tipo);
    if (typeof clase != 'undefined') {
        elemento.className = clase;
    }
    if (typeof id != 'undefined') {
        elemento.id = id;
    }
	
	if (typeof nombre != 'undefined') {
        elemento.name = nombre;
    }
	
    if (typeof texto != 'undefined') {
        elemento.innerHTML = texto;
    }
    if (typeof onclick_function != 'undefined') {
        elemento.setAttribute("onclick",onclick_function);
    }
    if (typeof onload_function != 'undefined') {
        elemento.setAttribute("onload",onload_function);
    }
    return elemento;
}

function setBg(elemento,imagen){
	elemento.style.backgroundSize='100% 100%';
	elemento.style.backgroundImage='url('+imagen+')';	
}

function addBg(elemento,imagen,ancho,alto){
	elemento.style.backgroundSize='100% 100%';
	elemento.style.backgroundImage='url('+imagen+')';
	elemento.style.width=ancho+'px';
	elemento.style.height=alto+'px';
}
function addBg2(elemento,imagen,ancho,alto){
	elemento.style.backgroundImage='url('+imagen+')';
	elemento.style.width=ancho+'px';
	elemento.style.height=alto+'px';
}
function addBgPorcentual(elemento,imagen,w,h){
    elemento.style.backgroundSize='100% 100%';
    elemento.style.backgroundImage='url('+imagen+')';
    elemento.style.width=w/100*ancho+'px';
    elemento.style.height=h/100*altura+'px';
}

function setPosition(elemento,position){
	if(position['top']!= 'undefined') {
		elemento.style.top=position['top'];
	}
    
    if(position['left']!= 'undefined') {
        elemento.style.left=position['left'];
    }
}

function posicionarPorcentual(elemento,x,y){
    elemento.style.position='absolute';
    elemento.style.left=x/100*ancho+'px';
    elemento.style.top=y/100*altura+'px';
}
 function posicionar(elemento,x,y){
    elemento.style.position='absolute';
    elemento.style.left=x+'px';
    elemento.style.top=y+'px';
}


function setMargin(elemento,margin){
	if(margin['top']!= 'undefined') {
		elemento.style.marginTop=margin['top'] + "px";
	}
	if(margin['right']!= 'undefined') {
		elemento.style.marginRight=margin['right'] + "px";
	}
	if(margin['bottom']!= 'undefined') {
		elemento.style.marginBottom=margin['bottom'] + "px";
	}
	if(margin['left']!= 'undefined') {
		elemento.style.marginLeft=margin['left'] + "px";
	}
}






function ocultar(elemento){
	elemento.style.display='none';
}

function mostrar(elemento){
	elemento.style.display='block';
}

function alinear(elemento){
	for(l=0;l<elemento.childNodes.length;l++){
		elemento.childNodes[l].style.float='left';
	}
}
function getNombreCategoria(id_categoria){
	var nombre_categoria = "";
	switch(id_categoria){
		case 0:
		case "0":
			nombre_categoria="todas";
            break;
		case 1:
		case "1":
			nombre_categoria="fotografias";
            break;
            
		case 2:
		case "2":
			nombre_categoria="descripcion";
            break;	
            
		case 3:
		case "3":
			nombre_categoria="atmosfera";
            break;	 
            
		case 4:
		case "4":
			nombre_categoria="musica";
            break;	 
            
		case 5:
		case "5":
			nombre_categoria="horario";
            break;	 
            
		case 6:
		case "6":
			nombre_categoria="carta";
            break;	 
            
		case 7:
		case "7":
			nombre_categoria="direccion";
            break;	
	}
	return nombre_categoria;
}
function getNombreMes(mes,idioma,numeroDigitos){
    var nombre_mes="";
    var hay_numeroDigitos = numeroDigitos == undefined ? 0 : 1;
    switch(idioma){
        case "es":
            switch(mes){
                case 1:
                case "01":
                case "1":
                    nombre_mes = "enero";
	 				break;
                case 2:
                case "02":
                case "2":
                    nombre_mes =  "febrero";
	 				break;
                case 3:
                case "03":
                case "3":	 				
                    nombre_mes = "marzo";
	 				break;
                case 4:
                case "04":
                case "4":	 				
                    nombre_mes = "abril";
	 				break;
                case 5:
                case "05":
                case "5":	 				
                    nombre_mes = "mayo";
	 				break;
                case 6:
                case "06":
                case "6":	 				
                    nombre_mes = "junio";
	 				break;
                case 7:
                case "07":
                case "7":	 				
                    nombre_mes =  "julio";
	 				break;
                case 8:
                case "08":
                case "8":	 				
                    nombre_mes = "agosto";
	 				break;
                case 9:
                case "09":
                case "9":
                    nombre_mes =  "septiembre";
	 				break;
                case 10:
                case "10":
                    nombre_mes =  "octubre";
	 				break;	 				
                case 11:
                case "11":	 				
                    nombre_mes =  "noviembre";
	 				break;
                case 12:
                case "12":	 				
                    nombre_mes = "diciembre";
	 				break;
            }
	 		break;
        case "en":
            switch(mes){
                case 1:
                case "01":
                case "1":
                    nombre_mes = "january";
	 				break;
                case 2:
                case "02":
                case "2":
                    nombre_mes =  "february";
	 				break;
                case 3:
                case "03":
                case "3":	 				
                    nombre_mes = "march";
	 				break;
                case 4:
                case "04":
                case "4":	 				
                    nombre_mes = "april";
	 				break;
                case 5:
                case "05":
                case "5":	 				
                    nombre_mes = "may";
	 				break;
                case 6:
                case "06":
                case "6":	 				
                    nombre_mes = "june";
	 				break;
                case 7:
                case "07":
                case "7":	 				
                    nombre_mes =  "july";
	 				break;
                case 8:
                case "08":
                case "8":	 				
                    nombre_mes = "august";
	 				break;
                case 9:
                case "09":
                case "9":
                    nombre_mes =  "september";
	 				break;
                case 10:
                case "10":
                    nombre_mes =  "october";
	 				break;	 				
                case 11:
                case "11":	 				
                    nombre_mes =  "november";
	 				break;
                case 12:
                case "12":	 				
                    nombre_mes = "december";
	 				break;
            }
	 		break;
    }
    if(hay_numeroDigitos){
        nombre_mes = nombre_mes.substring(0,numeroDigitos);
    }
    return nombre_mes;
}
String.prototype.mayusculaPrimeraLetra = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/******* funciones para la construccion de oDataPeticionWS *********/
function getJsonDevice(){

	var jsonDevice;
	switch (plataforma){
		case "web":
			jsonDevice = '{"platform":"iPhone","version":"5.1.1","name":"iPhone de ignasi","cordova":"1.8.1","uuid":"182F0D18-414C-5349"}';
            break;
		case "app":
			jsonDevice = JSON.stringify(device);
	}
    return jsonDevice;
}
function getUuid(){
	var uuid;
	switch (plataforma){
		case "web":
			uuid = 1;
            break;
		default:
			uuid = device.uuid;
		break;
	}
    return uuid;
}
function getTimestamp(){
	return +new Date;
}
function getDevice(){
	    
	switch (plataforma){
		case "web":
		var 	jsonDevice = '{"platform":"iPhone","version":"5.1.1","name":"iPhone de ignasi","cordova":"1.8.1","uuid":"182F0D18-414C-5349"}';
           device = eval('(' + jsonDevice + ')');
		 break;
		case "app":
			device;
		break;
	}
    return device;
}
function dataPeticionWS(){
    this.uuid =getUuid();
    this.timestamp = getTimestamp();
    //this.device = getJsonDevice();
    this.geoposition = getJsonPosition();
    this.sortby = "fecha";//solo necesario para la pagina de comentarios
    this.serializar = function() {
        var data = "uuid=" + this.uuid;
        data += "&timestamp=" + this.timestamp; 
        data += "&device=" + this.device; 
        data += "&geoposition=" + this.geoposition;  
        if(typeof id_local!='undefined'){
        	data += "&id_local=" + id_local;
        }

        return data;
    };
}


/****************loading functions ***********/
function insertarLoading(){
	var loading = crear_elemento_html('div','loading');
	addBg(loading,c_path['loading']+'radios.jpg',800,400);
	$("body").append(loading);
/*    var loading = crear_elemento_html('div','loading');
    var loading_image = crear_elemento_html('div','loading_image');
    loading.appendChild(loading_image);
    setCssLoading(loading);
    $("body").append(loading);
    $(".opacidad").css("background","white");
    $(".opacidad").show();*/
	
	
}


function ponerPreloader(){
    preloader=crear_elemento_html('section','preloader','preloader');
    $('#preloader').append(preloader);
  	addBg(preloader,c_path['loading']+'rad.jpg',ancho,altura);
  	posicionar(preloader,0,0);
}
function ponerConsole(x,y,w,h){        	
    console=crear_elemento_html('section','console_pad','console_pad');
    $('#console').append(console);   				
  	addBg(console,c_path['console']+'console.png',w,h);
  	posicionar(console,x,y);
  	console.style.zIndex=40;
}
function print_console(mensaje){
	var traza=crear_elemento_html("div","traza",'',mensaje);
	console.appendChild(traza);
}
function quitarLoading(){
	
    $(".opacidad").hide();
    $(".loading").hide(); 
    $("#preloader").hide();
    
}
function mostrarLoading(){
	$(".opacidad").css("opacity",1);
    $(".opacidad").show();
    $(".loading").show();
}
function setCssLoading(loading){
    var width_loading= $(window).width()/10;
    var height_loading= $(window).height()/10;
    var height_50 = $(window).height()/2;
    var width_50 = $(window).width()/2;
    loading.style.width = width_loading + "px";
    loading.style.height = height_loading + "px";
    loading.style.top = (height_50 -(height_loading/2)) + "px";
    loading.style.left = (width_50 - (width_loading/2)) + "px";
}
function mostrarOpacidad(){
    $(".opacidad").css("background","black");
	$(".opacidad").css("opacity",0.7);
	$(".opacidad").show();    
}
/******* funcion para bloquear el scroll de la aplicacion ******/
bloquearScroll = function(event) {
    event.preventDefault();
}

function elmininaContenedoresParaCambioPaginaBred(){
    $('#popups').remove();
    $('#panel_derecho').remove();
    $('#panel_izquierdo').remove();

}

function elmininaContenedoresParaCambioPaginaFicha(){
    $('#contenedorPrincipal').remove();
    
}


function showPreloader(){
    $("#preloader").show();
}

function hidePreloader(){
    $("#preloader").hide();
}

function showZoozRotation(){
    $("#zooz_rotation").show();
}

function hideZoozRotation(){
    $("#zooz_rotation").hide();
}

function showZoozBackground(){
    $("#zooz_background").show();
}

function hideZoozBackground(){
    $("#zooz_background").hide();
}
