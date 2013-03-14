function addIndiceSimpleScroll(contenedor,raiz_bg,raiz_icono,data,i){	
			var indiceSimple = crear_elemento_html('li','indice');
	
				indiceSimple.setAttribute('posicion','resultado_'+i);			
				var bg = crear_elemento_html('img','bg');

				bg.src = c_path[raiz_bg]+'indice.png';
				var info = crear_elemento_html('section','info');				
					var superior = crear_elemento_html('section','superior');					
						var icono = crear_elemento_html('img','icono');
						data.icono='default.png';
						icono.src = c_path[raiz_icono]+'rojo/'+data.icono;
						var nombre = crear_elemento_html('section','nombre',undefined,data.nombre);						
					var inferior = crear_elemento_html('section','inferior');	
					
						var titulo = crear_elemento_html('section','titulo',undefined,data.titulo);
						
			contenedor.appendChild(indiceSimple);
				indiceSimple.appendChild(bg);
				indiceSimple.appendChild(info);
					info.appendChild(superior);
						superior.appendChild(icono);
						superior.appendChild(nombre);
					info.appendChild(inferior);
						inferior.appendChild(titulo);
		indiceSimple.addEventListener(
							'click',
							function(e){
							scroll(e.currentTarget.getAttribute('posicion'))
							}
						);
		
		
		
	return indiceSimple;
}

function addIndiceSimpleGoTo(contenedor,raiz_bg,raiz_icono,data,i){	
			var indiceSimple = crear_elemento_html('li','indice');
	
				indiceSimple.setAttribute('posicion','resultado_'+i);			
				var bg = crear_elemento_html('img','bg');

				bg.src = c_path[raiz_bg]+'indice.png';
				var info = crear_elemento_html('section','info');				
					var superior = crear_elemento_html('section','superior');					
						var icono = crear_elemento_html('img','icono');
						data.icono='default.png';
						icono.src = c_path[raiz_icono]+'rojo/'+data.icono;
						var nombre = crear_elemento_html('section','nombre',undefined,data.nombre);						
					var inferior = crear_elemento_html('section','inferior');	
					
						var titulo = crear_elemento_html('section','titulo',undefined,"");
						
			contenedor.appendChild(indiceSimple);
				indiceSimple.appendChild(bg);
				indiceSimple.appendChild(info);
					info.appendChild(superior);
						superior.appendChild(icono);
						superior.appendChild(nombre);
					info.appendChild(inferior);
						inferior.appendChild(titulo);
		
			indiceSimple.addEventListener(
					'click',
					function(e){							
						$('.bloqueo_inactivo').remove();
						$('.lista_articulos').remove();						
						var localizador = e.currentTarget.getAttribute('id');
						var lista_articulos = setPanelInformacion($('.panel_informacion').get(0),localizador);
						$('.lista_articulos').add(lista_articulos);
						ajusteTextos();
						cargaScrolls();
					}
				);
		
		
	return indiceSimple;
}