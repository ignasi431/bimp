function getCardList(ultimoBar,indiceLocal){
                var url=ws['cardList'];
                var jsonCardList="";
                 //alert(JSON.stringify(oFiltros));
                $.ajax({
                       type: "POST",  		
                       url: url,
                       //data: 'peticion_ordenacion=' + JSON.stringify(oPeticionOrdenacion) + "&" + oDataPeticionWS.serializar(),
                       data: 'peticion_ordenacion=' + JSON.stringify(oFiltros) + "&" + oDataPeticionWS.serializar()+"&listaAcciones="+JSON.stringify(listaAcciones),
                       success: function(compressJson) {
                       
                       //alert(compressJson);
                       //alert("getCardList2");
                       data = JXG.decompress(compressJson);
                      
                       
                       var respData = $.trim(data);
                       jsonCardList=respData;
                       mainCardList(jsonCardList,ultimoBar,indiceLocal);
                       listaAcciones = new Array();
                       },
                       /* error: function(jqXHR, textStatus, errorThrown) {
                        
                        alert("card list jqXHR  :" + jqXHR);
                        alert("textStatus  :" + textStatus);
                        alert("errorThrown  :" + errorThrown);
                        },*/
                       });
            }



            /*********************************************************************/
            function mainCardList(jsonCardList,ultimoBar,indiceLocal){

       
                oCardList = eval('(' + jsonCardList + ')');
         
                creaGaleria();
                creaQuickMap();
                if (ultimoBar != undefined){
                    fichas_iniciales = ultimoBar;
                }
                pintaElementosLista(0,fichas_iniciales);
                getSizeTextos();
               // print_console('preevento');
               $('body').onImagesLoad( setTimeout('quitarLoading()',1000));
                //quitarLoading();
                 if (indiceLocal != undefined){
                        scrollar(indiceLocal);
                 }
                
            }

            


            function pintaElementosLista(iInicio,iFinal){
            
     
                iFicha=iFinal;
                
                
                for(i=iInicio;i<oCardList.cards.length && i<iFinal;i++){
                    
                  
                    var ficha=crear_elemento_html('li',undefined,i);
                    
                    $('#lista_fichas').append(ficha);
                    
                    
                    var lado_izquierdo=crear_elemento_html('section','lado_izq','lado_izq','','irA("fichaDetalle",' + oCardList.cards[i].id_local+','+i+')');
                  
                    var lado_derecho = crear_elemento_html('section','lado_der');
                    addBg(lado_izquierdo,''/*c_path['ficha_resumen']+'trans.png'*/);
                    addBg(lado_derecho,''/*c_path['ficha_resumen']+'trans.png'*/);			
                    ficha.appendChild(lado_izquierdo);
                    ficha.appendChild(lado_derecho);
                    alinear(ficha);
                    
                    
                    // LADO IZQUIERDO
                    
                    
                    
                    
                    addCabecera(lado_izquierdo,oCardList.cards[i]);
                    addRotulo(lado_izquierdo,oCardList.cards[i]);		
                    addTexto(lado_izquierdo,oCardList.cards[i]);
                    addPie(lado_izquierdo,oCardList.cards[i]);
                    // LADO DERECHO
                    
                    
                    
                    addQuickView(lado_derecho,oCardList.cards[i]);
                    addQuickMap(lado_derecho,oCardList.cards[i]);
                    addQuickComentario(lado_derecho,oCardList.cards[i]);
                    addEdad(lado_derecho,oCardList.cards[i]);
                    addPromo(lado_derecho,oCardList.cards[i]);
                    
                    
                    
                }
                
             
                $('#lista_fichas li').css('background-image','url('+c_path['ficha_resumen']+'bg.png)');
                $('.panel_derecho').css('width',(t_panel_derecho['w']));
                $('#lista_fichas').css('width',(t_panel_derecho['w']));
                $('#lista_fichas li').css('height',t_lado_izquierdo['h']);
                
                
                loaded('wrapper');
                
            }
            
            
            
            

            function addCabecera(padre,card){
                
                var cabecera = crear_elemento_html('header','cabecera');
                var rating= getRating(card.ratings[0].estrellas,'rating_general');
                //var nombre = crear_elemento_html('section','nombre',undefined,card.nombre+' ' +card.puntos);
                var nombre = crear_elemento_html('section','nombre',undefined,card.nombre);
                cabecera.appendChild(rating);
                cabecera.appendChild(nombre);
                alinear(cabecera);
                //addBg(cabecera,'',t_cabecera['w'],t_cabecera['h']);	
                padre.appendChild(cabecera);
            }
            function addRotulo(padre,card){
                var rotulo= crear_elemento_html('section','rotulo');
                //addBg(rotulo,c_path['rotulos']+card.imagen,t_rotulo['w'],t_rotulo['h']);
                addBg(rotulo,c_path['rotulos']+card.imagen);
                padre.appendChild(rotulo);
                
            }
            function addTexto(padre,card){
                var cadTexto = card.texto;
                
                cadTexto = anadeSingoDePuntuacionSiLaDescripcionNoAcabaEnSignoDePuntuacion(cadTexto);
                
                var texto= crear_elemento_html('section','texto',undefined,cadTexto);	
                padre.appendChild(texto);
            
                if (esTextoDemasiadoLargo(texto)){
                    cortarTexto(texto,180,padre,cadTexto);
                }
                
            }

            function anadeSingoDePuntuacionSiLaDescripcionNoAcabaEnSignoDePuntuacion(cadTexto) {
                if (cadTexto.substring(cadTexto.length-1,cadTexto.length) != "."){
                    cadTexto = cadTexto + ".";
                }
    
                return cadTexto;
            }

            function cortarTexto(texto,lenght,padre,cadTexto){
                texto.innerHTML = cadTexto.substring(0,lenght) + "...";
                padre.removeChild(texto);
                padre.appendChild(texto);    
            }

            function esTextoDemasiadoLargo(element){
                return t_altura_texto_teaser_ficha < element.scrollHeight;
            }

        
            
            function addPie(padre,card){
                var linea_superior= crear_elemento_html('section','linea_extras');	
                var linea_inferior= crear_elemento_html('section','linea_extras');
                for(celda=0;celda<8 && celda<card.extras.length;celda++){
                    
                    var extra = crear_elemento_html('section','extra');
                    if(celda<4){
                        linea_superior.appendChild(extra);					
                    } else {
                        linea_inferior.appendChild(extra);		
                        
                    }
                    //addBg(extra,c_path['extras']+card.extras[celda]['path'],t_extra['w'],t_extra['h']);	
                    addBg(extra,c_path['extras']+card.extras[celda]['path']);				
                }
                //	addBg(linea_superior,c_path['ficha_resumen']+'trans.png',t_extras_box['w'],t_extra['h']);		
                //	addBg(linea_inferior,c_path['ficha_resumen']+'trans.png',t_extras_box['w'],t_extra['h']);		
                
                
               
                var extrasBox=crear_elemento_html('section','extras_box');	
                //	addBg(linea_inferior,c_path['ficha_resumen']+'trans.png',t_extras_box['w'],t_extras_box['h']);	
                extrasBox.appendChild(linea_superior);
                extrasBox.appendChild(linea_inferior);	
                
                var pie= crear_elemento_html('section','pie');	
                //addBg(pie,c_path['ficha_resumen']+'trans.png',t_pie['w'],t_pie['h']);	
                pie.appendChild(extrasBox);
                pie.appendChild(getInfoBox(card));			
                padre.appendChild(pie);		
            }
            
            function	addQuickView(padre,card){
                var qv= crear_elemento_html('section','quick_view');	
                qv.setAttribute('target', card.id_card); 	                   
                qv.addEventListener(
                	'click',
                	function(e) {
                         guardaAccion('abrir_quick_view','bred.html');
                		lanzarGaleria(e.currentTarget.getAttribute('target'));
                	}
                );
                //addBg(qv,c_path['ficha_resumen']+'trans.png',t_lado_derecho['w'],t_qv['h']);	
                padre.appendChild(qv);				
            }
            
            
            
            
            function	addQuickMap(padre,card){	
                
                var qm= crear_elemento_html('section','quick_map');	
                qm.setAttribute('target', card.quickmap); 	                   
                qm.addEventListener(
                	'click',
                	function(e) {
                         guardaAccion('abrir_quick_map','bred.html');
                		lanzarQuickMap(e.currentTarget.getAttribute('target'));
                	}
                );
                padre.appendChild(qm);	
            }
            function	addQuickComentario(padre,card){	
                //alert(card.comentarios);
                var qc= crear_elemento_html('section','quick_comentario');
                qc.setAttribute('id_local', card.id_local);
                qc.setAttribute('id_card', card.id_card);
                qc.setAttribute('enlace', 'comentarios'); 
                qc.addEventListener(
                	'click',
                	function(e) {
                        guardaAccion('abrir_comentarios','bred.html');
                		irA(e.currentTarget.getAttribute('enlace'),e.currentTarget.getAttribute('id_local'),e.currentTarget.getAttribute('id_card'));
                	}
                );
               
                
                
                var num_comentarios = crear_elemento_html('section','numero',undefined,card.comentarios['numero']);
                var literal_comentarios = crear_elemento_html('section','comentarios',undefined,card.comentarios['texto']);
                qc.appendChild(num_comentarios);
                qc.appendChild(literal_comentarios);
                padre.appendChild(qc);	
            }
            function	addEdad(padre,card){
				var edad = crear_elemento_html('section','edad',undefined);	
                var texto= crear_elemento_html('section','texto',undefined,card.edad['texto']);	
                var rango= crear_elemento_html('section','rango',undefined,card.edad['rango']);	               
                //addBg(edad,c_path['ficha_resumen']+'trans.png',t_lado_derecho['w'],t_edad['h']);	
                //addBg(edad,'',t_lado_derecho['w'],t_edad['h']);	
				
				padre.appendChild(edad);	
				edad.appendChild(texto);	
				edad.appendChild(rango);	
            }
            function	addPromo(padre,card){
                var textoPromo ='Sin promocion';
                if(card.promocion['nombre']){
                    textoPromo = card.promocion['nombre'];
                }
                
                var promo= crear_elemento_html('section','promo',undefined,textoPromo);
                //addBg(promo,c_path['ficha_resumen']+'trans.png',t_lado_derecho['w'],t_promo['h']);	
                padre.appendChild(promo);	
                //alto_promo=64*ratio_ficha;
            }
            
        
            
            /***************************** iscroll4 ****************************************************/
            var miScroll;
            function loaded(id_div) {
                pullDownEl = document.getElementById('pullDown');
                pullDownOffset = pullDownEl.offsetHeight;
                pullUpEl = document.getElementById('pullUp');	
                pullUpOffset = pullUpEl.offsetHeight;
                if(miScroll == undefined || miScroll==null){
                    miScroll = new iScroll(id_div , {
                                           useTransition: true,
                                           topOffset: pullDownOffset,
                                           onRefresh: function () {
                                           if (pullDownEl.className.match('loading')) {
                                           pullDownEl.className = '';
                                           pullDownEl.querySelector('.pullDownLabel').innerHTML = '&nbsp;&nbsp;Estire para ver más resultados &nbsp;&nbsp;&nbsp;&nbsp;>>>>>>>>>>>>>>>>>>>>>>>';
                                           } else if (pullUpEl.className.match('loading')) {
                                           pullUpEl.className = '';
                                           pullUpEl.querySelector('.pullUpLabel').innerHTML = '&nbsp;&nbsp;Estire para ver más resultados &nbsp;&nbsp;&nbsp;&nbsp;>>>>>>>>>>>>>>>>>>>>>>> ';
                                           }
                                           },
                                           onScrollMove: function () {
                                           if (this.y > 5 && !pullDownEl.className.match('flip')) {
 
                                           } else if (this.y < 5 && pullDownEl.className.match('flip')) {
 
                                           } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                                           pullUpEl.className = 'flip';
                                           pullUpEl.querySelector('.pullUpLabel').innerHTML = '&nbsp;&nbsp;Cargando... ___________________________________________';
                                           this.maxScrollY = this.maxScrollY;
                                           } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
          
                                           }
                                           },
                                           onScrollEnd: function () {
                                           
                                           if (pullDownEl.className.match('flip')) {
     
                                           pullDownAction();	// Execute custom function (ajax call?)
                                           } else if (pullUpEl.className.match('flip')) {
  
                                           
                                           pullUpEl.className = 'loading';
                                           pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...5';

                                           if (!cargando){
                                           
               
                                           addElements();	// Execute custom function (ajax call?)


                                           }				
                                           
                                           }
                                           }
                                           });
                }else{
                        

                        miScroll.refresh();

                    
                    }
                
                setTimeout(function () { document.getElementById('transition').style.left = '0'; }, 800);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            
            
            
            function getInfoBox(card){
                var infoBox = crear_elemento_html('section','info_box');
                
                var texto_estilos_musicales;
                
                
                if (card.musica.musica_variada == "1"){
                     texto_estilos_musicales= "Música variada";
                }else{
                     texto_estilos_musicales= getEstilosLocal(card.musica[0]['texto'],card.musica[1]['texto'],card.musica[2]['texto']);
                }
                
                
                var estilos_musicales=crear_elemento_html('section','estilos_musicales',undefined,texto_estilos_musicales);
                var ratings=new Array();
                ratings[0]=getRatingBox(card.ratings[4].nombre,card.ratings[4].estrellas);
                ratings[1]=getRatingBox(card.ratings[3].nombre,card.ratings[3].estrellas);
                ratings[2]=getRatingBox(card.ratings[6].nombre,card.ratings[6].estrellas);	
                infoBox.appendChild(ratings[0]);
                infoBox.appendChild(ratings[1]);
                infoBox.appendChild(ratings[2]);
                infoBox.appendChild(estilos_musicales);
                return infoBox;
            }

            function getEstilosLocal(opcion0,opcion1,opcion2){
                var listaEstilos=new Array();
                var subtitulo = "";
    
                if ((opcion0 != "") && (opcion0 != "Nada")){
                    if (jQuery.inArray(opcion0, listaEstilos) == "-1"){
                        listaEstilos.push(opcion0);
                    }
                }
    
                if ((opcion1 != "") && (opcion1 != "Nada")){
                    if (jQuery.inArray(opcion1, listaEstilos) == "-1"){
                        listaEstilos.push(opcion1);
                    }
                }
    
                if ((opcion2 != "") && (opcion2 != "Nada")){
                    if (jQuery.inArray(opcion2, listaEstilos) == "-1"){
                        listaEstilos.push(opcion2);
                    }
                }
    
    
                for(var i=0;i<listaEstilos.length;i++){
                    subtitulo = subtitulo + listaEstilos[i] + " - ";
                }
    
                if (subtitulo.substring(subtitulo.length - 2, subtitulo.lenght) == "- "){
                    subtitulo = subtitulo.substring(0, subtitulo.length - 3);
                }
                
                if (subtitulo == ""){
                    subtitulo = "Local sin música";
                }
                return subtitulo;
            }



            function getRatingBox(titulo,puntos_rating){
              
                var ratingBox=crear_elemento_html('section','rating_box');
                var nombre = crear_elemento_html('section','texto_rating_box',undefined,titulo);
                var rating = getRating(puntos_rating,'rating');
              
                ratingBox.appendChild(nombre);
                ratingBox.appendChild(rating);
                alinear(ratingBox);
                return ratingBox;
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
                
                var estrella=crear_elemento_html('section','estrella estrella_'+puntas);
                addBg(estrella,c_path['estrellas']+'estrella_'+puntas+'.png');
                padre.appendChild(estrella);	
            }	

            function addElements(){
               
                var nuevaFicha=iFicha;
                var final = parseInt(iFicha)+parseInt(fichas_mas);
                pintaElementosLista(iFicha,final);
                getSizeTextos();

            }
            function insertarLoadingCartList(){
            	$('#lista_fichas li').remove();
                var div_load = crear_elemento_html('div','load_cardList');
                var width_loading= $(window).width()/10;
                var height_loading= $(window).height()/10;
                var height_50 = $(window).height()/2;
                var left = t_panel_izquierdo['w'] + t_panel_derecho['w']
                div_load.style.width = width_loading + "px";
                div_load.style.height = height_loading + "px";
                div_load.style.top = (height_50 -(height_loading/2)) + "px";
                div_load.style.left = (left - (width_loading/2)) + "px";                
                $('#lista_fichas').html(div_load);
            }
            function destruirLista(){
                $('#lista_fichas').html("");
                //$('#lista_fichas li').remove();
                miScroll.destroy();
                miScroll = null;
            }
            function scrollar(id){

                var positionTop= $("#lista_fichas #" + id).position().top;

                
                miScroll.scrollTo(0, 0-positionTop, 200);
            }
            
            
            
            function creaGaleria(){
                var galeria_popup =crear_elemento_html('article','popup','galeria_popup');
                var galeria=crear_elemento_html('section','galeria_imagenes','galeria_imagenes');
                
                var cruz_cerrar=crear_elemento_html('section','cruz_cerrar',undefined,'','ocultarGaleria("imagenes")');
                addBg(cruz_cerrar,c_path['popup']+'cruz_cerrar.png',t_boton_cruz['w'],t_boton_cruz['h']);
                setPosition(cruz_cerrar,position_cruz);
                
                galeria_popup.appendChild(galeria);
                galeria_popup.appendChild(cruz_cerrar);
                ocultar(galeria_popup);
                $('#popups').append(galeria_popup);
                centrarPopups();
            }
            function creaQuickMap(){
                var qm_popup =crear_elemento_html('article','popup','quick_map_popup');                                
                var cruz_cerrar=crear_elemento_html('section','cruz_cerrar',undefined,'','ocultar_qm()');
                addBg(cruz_cerrar,c_path['popup']+'cruz_cerrar.png',t_boton_cruz['w'],t_boton_cruz['h']);
                setPosition(cruz_cerrar,position_cruz);
                //$('#popups #galeria_popup').append(cruz_cerrar);                                
                qm_popup.appendChild(cruz_cerrar);
                ocultar(qm_popup);
                $('#popups').append(qm_popup);
            }
            function ocultar_qm(){
                guardaAccion('cerrar_quick_map','bred.html');
            	backKeyAction='back';
                $('#popups #quick_map_popup .imagen_qm').remove();
                $('#popups #quick_map_popup').hide();
                $(".opacidad").hide();
                
            }
            function lanzarQuickMap(id_zona){
            	backKeyAction='cerrar_quicks';
            	//print_console('accion:'+backKeyAction);
                mostrarOpacidad();
                var imagen_qm=crear_elemento_html('section','imagen_qm');	
                addBg(imagen_qm,c_path['qm']+'qm_'+id_zona+'.jpg',t_popup['w'],t_popup['h']);
                $('#popups #quick_map_popup').prepend(imagen_qm);
                $('#popups #quick_map_popup').show();
                centrarPopups();
                /*
                 	$('#popups #quick_map_popup .imagen_qm').css('background-image','url('+c_path['qm']+'qm_'+id_zona+'.png)');
                 	$('#popups #quick_map_popup .imagen_qm').css('width',t_popup['w']);
                 	$('#popups #quick_map_popup .imagen_qm').css('height',t_popup['h']);
                */
                
            }
            
            function ocultarGaleria(tipo){
                guardaAccion('cerrar_quick_view','bred.html');
            	backKeyAction='back';
                $('#popups #galeria_popup').hide();
                $('#popups #galeria_popup').remove();
                creaGaleria();
                $(".opacidad").hide();
            }
            function lanzarGaleria(id_card){

                
            	backKeyAction='cerrar_quicks';
                var card;
                for (iCard in oCardList.cards){
                    if (oCardList.cards[iCard].id_card == id_card){
                        card = oCardList.cards[iCard];
                    }
                }
                
                
                
                $('#popups #galeria_popup').show();
                $('#popups #galeria_imagenes').css('width',t_popup['w']);
                $('#popups #galeria_imagenes').css('height',t_popup['h']);
                
                var carousel;
                var el;
                var i;
                var page;
                var paginas=new Array();
                
                for(iImagen=0;iImagen<card.imagenes.length;iImagen++){
                    
                    if(card.imagenes[iImagen]!='default.png'){
                        var pathImagen='url('+c_path['fotos']+card.imagenes[iImagen]+')';
                        
                        paginas[iImagen]='<div class=imagen_galeria style="background-image:'+pathImagen+'; width:'+t_popup['w']+'; height:'+t_popup['h']+'px"></div>';	
                        
                    }
                }
                
                
                $('#popups #galeria_imagenes .imagen_galeria').css('width',t_popup['w']);
                $('#popups #galeria_imagenes .imagen_galeria').css('height',t_popup['h']);
                
                var slides = paginas;		
                carousel = new SwipeView('#popups #galeria_imagenes', {	numberOfPages: slides.length,hastyPageFlip: true});	
                // Load initial data
                for (i=0; i<3; i++) {
                    page = i==0 ? slides.length-1 : i-1;
                    el = document.createElement('span');
                    el.innerHTML = slides[page];
                    carousel.masterPages[i].appendChild(el)
                }
                
                carousel.onFlip(function () {
                                var el,
                                upcoming,
                                i;
                                for (i=0; i<3; i++) {
                                upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;
                                if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
                                el = carousel.masterPages[i].querySelector('span');
                                el.innerHTML = slides[upcoming];
                                }
                                }
                                
                                });
                mostrarOpacidad();
            }        
 
            function setPeticionOrdenacion(){
                oPeticionOrdenacion = new PeticionOrdenacion();
                for(iFiltro=0;iFiltro<oFiltros.filtros.length;iFiltro++){		
                    var miFiltro=new Filtro(oFiltros.filtros[iFiltro].tipo,oFiltros.filtros[iFiltro].nombre,oFiltros.filtros[iFiltro].id);
                    miFiltro.seleccionadas = oFiltros.filtros[iFiltro].seleccionadas;
                    miFiltro.relevancia = oFiltros.filtros[iFiltro].relevancia;
                    
                    oPeticionOrdenacion.filtros.push(miFiltro);	
                    
                }//alert(JSON.stringify(oPeticionOrdenacion));
            }
            function repintarLista(jsonCardList){
               
                oCardList = eval('(' + jsonCardList + ')');	
                destruirLista();
                pintaElementosLista(0,fichas_iniciales);
                getSizeTextos();
                //scrollar(0);
                //alert(jsonCardList);
                
            }
            function quitarPreloader(){
                $('#preloader').css("display", "none");
            }

    


            
