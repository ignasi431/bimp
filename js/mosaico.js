function crearMosaico(filtro,id_indice){                  
    
                    //CONTENEDOR DEL POP UP
                   	var popup = crear_elemento_html('article','popup','popup_'+id_indice);
                   	
                    // EL POP UP TIPO MOSAICO
                    var mosaico = crear_elemento_html('section','mosaico');
                    addBg(mosaico,'',t_popup['w'],t_popup['h']);               
                    popup.appendChild(mosaico);
                    
                    // PARTE SUPERIO CARRUSEL
                    var carrusel = crear_elemento_html('section','carrusel');
                    addBg(carrusel,'',t_carrusel_de_botones['w'],t_carrusel_de_botones['h']);
                    mosaico.appendChild(carrusel);
                    
                    // PARTE INFERIOR MANIPULADORES
					crearManipulador(mosaico,id_indice);
					
    
                    $('#popups').append(popup);
                    setRelevancia(id_indice,filtro.relevancia);
                    $('#popup_'+id_indice).hide();	
                    }
					
		function crearManipulador(target,id_indice){
           
					var manipuladores = crear_elemento_html('section','manipuladores');
                    target.appendChild(manipuladores);
          
                    // OK
                    var parametros=' parametro0&' + id_indice;
                    var funcion = ' funcion&'+'cerrarPopup';
              
                    var ok = crear_elemento_html('section','ok'+funcion+parametros,'ok_'+id_indice);  
                    addBg(ok,c_path['popup']+'ok.png',t_boton['w'],t_boton['h']);                   
                    ok.setAttribute('target', id_indice); 	                   
                    ok.addEventListener(
                    	'click',
                    	function(e) {
                    		cerrarPopup(e.currentTarget.getAttribute('target'));
                    	}
                    );
                    
                  
                   
                    manipuladores.appendChild(ok);
                    //RELEVANCIA
					
                    var relevancia_box = crear_elemento_html('section','relevancia_box');
                    manipuladores.appendChild(relevancia_box);
                    var relevancia_apagada = new Array();
                    var relevancia_encendida = new Array();
                    for(iRelevancia=0;iRelevancia<3;iRelevancia++){
                        relevancia_apagada[iRelevancia] = crear_elemento_html('section','relevancia','relevancia_apagada_'+iRelevancia,'','setRelevancia('+id_indice+','+iRelevancia+',true)');
                        addBg(relevancia_apagada[iRelevancia],c_path['popup']+'relevancia_apagada_'+iRelevancia+'.png',t_boton['w'],t_boton['h']);
                        relevancia_encendida[iRelevancia] = crear_elemento_html('section','relevancia','relevancia_encendida_'+iRelevancia,'','setRelevancia('+id_indice+','+iRelevancia+',true)');	
                        addBg(relevancia_encendida[iRelevancia],c_path['popup']+'relevancia_encendida_'+iRelevancia+'.png',t_boton['w'],t_boton['h']);
                        relevancia_box.appendChild(relevancia_apagada[iRelevancia]);
                        relevancia_box.appendChild(relevancia_encendida[iRelevancia]);
                    }
                    alinear(relevancia_box);
					
					
			}
			function cerrarPopup(id_indice){
            
				backKeyAction='back';
                updateLista();
                $('#popup_'+id_indice).hide();
                $('.opacidad').hide();
            	
            }
			function lanzarMosaico(id_indice){

                var filtro=oFiltros.filtros[id_indice]; 
				var aOpciones=filtro.opciones;
				var aSeleccionadas=filtro.seleccionadas;
				
				var carousel; 
                var el;
                var i;  
                var page;
				var slides=new Array;
				var iSlide=0;
				slides[iSlide]='';
				
				var opciones_por_pagina=9;
				var iOpcionPagina=0;
				for (iOpcion in aOpciones){
					var opcion= crear_elemento_html('div','opcion_mosaico');
						var icono=crear_elemento_html('img','icono');
						icono.src = c_path[filtro.raiz]+aOpciones[iOpcion].path;
                   
						var texto=crear_elemento_html('div','texto','',aOpciones[iOpcion].nombre);
					opcion.appendChild(icono);
					opcion.appendChild(texto);
				
					if (contains(aSeleccionadas,aOpciones[iOpcion].id)){
						opcion.setAttribute('sel','false');						
					} else {
							opcion.setAttribute('sel','true');
						}
					
					slides[iSlide]+=opcion.outerHTML;
					iOpcionPagina++;
					if(iOpcionPagina>=opciones_por_pagina){
						iSlide++;
						slides[iSlide]='';
						iOpcionPagina=0;
					}
				
				}
				for(s in slides){
					alert(slides[s]);
				}
				  carousel = new SwipeView('#popup_'+id_indice + ' .mosaico .carrusel', {	numberOfPages: slides.length,hastyPageFlip: true});	
                // Load initial data
                for (i=0; i<3; i++) {
                    page = i==0 ? slides.length-1 : i-1;
                    el = document.createElement('span');
                    el.innerHTML = slides[page];
                    carousel.masterPages[i].appendChild(el)
                }
                
				carousel.onFlip(
					function () {
					alert('flip');
						var el,upcoming,i;
                        for (i=0; i<3; i++) {
							upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;
                            if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
                                el = carousel.masterPages[i].querySelector('span');
                                el.innerHTML = slides[upcoming];
								
                            }
						}   
						
                    }
				);
               // caragarContenidoMosaico(id_indice);
                
				
				
				$('#popup_'+id_indice).show();
				
				
				
			
			}		
			function contains(a, value) {
				var i = a.length;
				while (i--) {					
					if (a[i] == value) {					
						return i;					
					}
				}
				return -1;
			}
function lanzaMosaico(id_indice){
    

    // 	print_console('lanzar mosaico2 ');
    // 			Cargar el filtro
    var filtro=oFiltros.filtros[id_indice];

    //			Mostrar el popup
    $('#popup_'+id_indice).show();
    //			Iniciar variables
    var carousel;
    var el;
    var i;
    var page;
    var paginas=new Array();
    var iconos_por_pagina=9;
    var iOpcion=0;
    var pagina_actual=0;
    
    //   print_console('opciones: '+filtro.opciones.length);
    while(iOpcion<filtro.opciones.length){
        // print_console('cargando pagina: '+pagina_actual);
        
        paginas[pagina_actual]='';
        for(i=0;i<iconos_por_pagina;i++){
            // print_console('i: '+i + 'iconos_por_pagina: '+ iconos_por_pagina);
            
            if(iOpcion<filtro.opciones.length){
                var onClick = 'iconoPulsado('+id_indice+','+iOpcion+')';
                var opcion= crear_elemento_html('div','opcion_mosaico','boton_'+iOpcion,'',onClick);
                opcion.setAttribute('id_opcion',filtro.opciones[iOpcion].id);
                var icono=crear_elemento_html('img','icono');
                icono.src = c_path[filtro.raiz]+filtro.opciones[iOpcion].path;

                var texto=crear_elemento_html('div','texto','',filtro.opciones[iOpcion].nombre);
                opcion.appendChild(icono);
                opcion.appendChild(texto);
                
				
                if (contains(filtro.seleccionadas,filtro.opciones[iOpcion].id)){
                    opcion.setAttribute('sel','false');
                    
                } else {
                    opcion.setAttribute('sel','true');
                }
                
                
                /*  var id= 'boton_'+iOpcion;
                 var onClick = 'iconoPulsado('+id_indice+','+iOpcion+')';
                 var clase ='boton';
                 var divIcono='';
                 divIcono ='<div id=' + id + ' class='+clase+' onclick=' + onClick + ' style="width:'+t_base_boton_mosaico['w']+'px; height:'+t_base_boton_mosaico['h']+'px; ">';
                 divIcono +='	<div class=icono  style=" background-image:url('+c_path[filtro.raiz]+filtro.opciones[iOpcion].path+');"></div>';
                 divIcono +='	<div class=texto style="font-size:' + t_letra_mosaico + '%">'+filtro.opciones[iOpcion].nombre+'</div>';
                 divIcono +='</div>';
                 */
                var divIcono=opcion.outerHTML;
                paginas[pagina_actual]+=divIcono;
                iOpcion++;
                
            }
            //print_console('i: '+i + 'iconos_por_pagina: '+ iconos_por_pagina);
        }
        
        pagina_actual++;
    }
    
    var slides = paginas;
    carousel = new SwipeView('#popup_'+id_indice + ' .mosaico .carrusel', {	numberOfPages: slides.length,hastyPageFlip: true});
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
                    caragarContenidoMosaico(id_indice);
                    
                    
                    
                    });
    
    caragarContenidoMosaico(id_indice);
}
            function caragarContenidoMosaico(id_indice){

			    var filtro=oFiltros.filtros[id_indice];
				var opciones_visibles=$('.opcion_mosaico');
            
                
                for (i=0; i<opciones_visibles.length; i++) {
                    
                    var opcion = opciones_visibles[i];
                   
                    
                    if(opcion.getAttribute('id_opcion')){
            
                        var iSeleccionada=contains(filtro.seleccionadas,opcion.getAttribute('id_opcion'));
                        
						if (iSeleccionada>-1){
							opcion.setAttribute('sel','true');
						} else {
							opcion.setAttribute('sel','false');
						}
                    }
          
                                        

                }
              
				/*for (iOpcionVisible in opciones_visibles){
                    
					if(opciones_visibles[iOpcionVisible].getAttribute('id_opcion')){
					
					 var iSeleccionada=contains(filtro.seleccionadas,opciones_visibles[iOpcionVisible].getAttribute('id_opcion'));
						if (iSeleccionada>-1){
							opciones_visibles[iOpcionVisible].setAttribute('sel','true');
						} else {
							opciones_visibles[iOpcionVisible].setAttribute('sel','false');
						}
						}
				
				
				}*/

                
            }

          function setRelevancia(id_indice,nivel,relevanciaPulsada){
              
              if(relevanciaPulsada){
                    guardaAccion('set_relevancia_filtro_'+id_indice+'_nivel_'+nivel,'bred.html');
              }
              
                var filtro=oFiltros.filtros[id_indice];
                filtro.relevancia=nivel;
                
                var idTag = '#boton_' + id_indice + ' .imagen';
                var grafico='url('+c_path['botones']+filtro.botones[nivel]+')';
                
                $(idTag).css('background-image',grafico);
                for(j=0;j<nivel+1;j++){
                    $('#popup_'+id_indice + ' #relevancia_encendida_'+j).show();
                    $('#popup_'+id_indice + ' #relevancia_apagada_'+j).hide();
                }
                for(j=nivel+1;j<3;j++){
                    $('#popup_'+id_indice + ' #relevancia_encendida_'+j).hide();
                    $('#popup_'+id_indice + ' #relevancia_apagada_'+j).show();
                }
            }

           function iconoPulsado(id_indice,id_boton){
               guardaAccion('icono_mosaico_pulsado_'+id_indice+'_'+id_boton,'bred.html');
              
            //    print_console('icono pulsado');
                var filtro=oFiltros.filtros[id_indice];
                var idPulsada=filtro.opciones[id_boton]['id'];
           
               var iSeleccionada=contains(filtro.seleccionadas,idPulsada);
               
				if (iSeleccionada>-1){
				//	filtro.opciones[id_boton];
				 filtro.seleccionadas.splice(iSeleccionada, 1);
				} else {
					filtro.seleccionadas.push(idPulsada);
				}
				
				
				
				//alert(filtro.seleccionadas);
               
               caragarContenidoMosaico(id_indice);
            }
					
					
					
					
					
