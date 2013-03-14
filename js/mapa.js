	function crearMapa(filtro,id_indice){
                   var popup = crear_elemento_html('article','popup','popup_'+id_indice);
                    $('#popups').append(popup);				
                    $('#popup_'+id_indice).hide();	
                    
                    var mapa = crear_elemento_html('section','mapa');
                  
                    popup.appendChild(mapa);
                    var base = crear_elemento_html('section','base');
                    addBg(base,c_path['mapa']+filtro.fondo,t_popup['w'],t_popup['h']);
                    mapa.appendChild(base);
                    var zonas=new Array();
                    for(iZona=0;iZona<filtro.opciones.length;iZona++){		
                        zonas[iZona]=crear_elemento_html('section','zona','zona_'+filtro.opciones[iZona]['id']);
                        addBg(zonas[iZona],c_path['mapa']+filtro.opciones[iZona]['path'],t_popup['w'],t_popup['h']);
                        mapa.appendChild(zonas[iZona]);
                    }
                    
                       var parametros=' parametro0&' + id_indice;
	                    var funcion = ' funcion&'+'mapaPulsado'; 
                    $('#popup_'+id_indice).append('<section id=pusable class="mapa"></section>');		
                    $('#popup_'+id_indice + ' #pusable' ).css('background-image','url('+c_path['mapa']+'transparente.png)');
                    $('#popup_'+id_indice + ' #pusable' ).css('width',t_popup['w']);
                    $('#popup_'+id_indice + ' #pusable' ).css('height',t_popup['h']);
                    $('#popup_'+id_indice + ' #pusable' ).bind('click', function(event) { mapaPulsado(event,id_indice);}); 	
                    var pulsable = $('#popup_'+id_indice + ' #pusable' ).get(0);
                    
                    pulsable.setAttribute('target', id_indice);                
					pulsable.addEventListener(
						'touchend',
						function(e) {	
						//	alert('pulsable');
							eventoMapaPulsado(e,e.currentTarget.getAttribute('target'));		
						}
					);
                    
                    for(iSeleccionada=0;iSeleccionada<filtro.seleccionadas.length;iSeleccionada++){						
                        $('#zona_'+filtro.seleccionadas[iSeleccionada]).show();			
                    }
                  
                    
                    // MANIPULADORES
                    
                    // PARTE INFERIO MANIPULADORES
                    var manipuladores = crear_elemento_html('section','manipuladores','manipuladores_mapa');
                    mapa.appendChild(manipuladores);
                    // OK
                    var ok = crear_elemento_html('section','ok'+funcion+parametros,'ok_'+id_indice);  
                    addBg(ok,c_path['popup']+'ok.png',t_boton['w'],t_boton['h']);                   
                    ok.setAttribute('target', id_indice); 	                   
                    ok.addEventListener(
                    	'click',
                    	function(e) {
                    		//alert('ok');
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
                    
                    setRelevancia(id_indice,filtro.relevancia,true);
					}
					
				
					function eventoMapaPulsado(e,id_indice){
                        
						var matrizMapa=oFiltros.filtros[id_indice].matrizMapa;						
						var posX=Math.floor(e.changedTouches[0].pageX * 100 /t_popup['w']);
						var posY=Math.floor(e.changedTouches[0].pageY * 100 /t_popup['h']);		
						var id_zona_pulsada=matrizMapa[posX][posY];
					
						$('#zona_'+id_zona_pulsada).toggle();
						
                        if($('#zona_'+id_zona_pulsada).css('display')!='none'){
                            guardaAccion('mapa_marca_zona_'+id_zona_pulsada,'bred.html');
                        }else{
                            guardaAccion('mapa_desmarca_zona_'+id_zona_pulsada,'bred.html');
                        }
                        
                        
						oFiltros.filtros[id_indice].seleccionadas=new Array();
						var opcionesMapa=oFiltros.filtros[id_indice].opciones;
						
						for(k=0;k<opcionesMapa.length;k++){
							if($('#zona_'+opcionesMapa[k]['id']).css('display')!='none'){
								oFiltros.filtros[id_indice].seleccionadas.push(opcionesMapa[k]['id']);
							}
						}
                        
					}
					
