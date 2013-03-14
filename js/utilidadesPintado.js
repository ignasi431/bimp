		function set_tamano_elementos_lista(selector_bg,selector_info){
			jQuery(selector_bg).each(
				function(){
					var img = jQuery(this);
					if (img.attr("complete")) {					
					} else {
						img.load(function(){
							var altura_imagen_resultado=$(selector_bg).height();
							$(selector_info).height(altura_imagen_resultado);				
						});
					}
				}
			);
		}
		function get_bg_elemento_lista(path){
			var elemento_lista_bg = crear_elemento_html('li','bg');	
				var imagen=crear_elemento_html('img','imagen');					
				imagen.src=path;
			elemento_lista_bg.appendChild(imagen);
			return elemento_lista_bg;
		}