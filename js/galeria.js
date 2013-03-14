	function lanzar_popup_imagen(imagen,ubicacion){
			var path=c_path[ubicacion]+imagen;
			var popup = crear_elemento_html('section','popup');			
				var boton_cerrar = crear_elemento_html('img','boton_cerrar');
				boton_cerrar.src = c_path['popup'] + "cruz_cerrar.png";				
				boton_cerrar.addEventListener(	
					'click',
					function(e){
						$('.popup').remove();
						$('.bloqueo').remove();
					}
				);				
				var galeria = crear_elemento_html('section','galeria');
					var imagen=crear_elemento_html('section','imagen');	
					imagen.style.backgroundImage='url('+path+')';
			var bloqueo = crear_elemento_html('section','bloqueo');
				
				body.appendChild(popup);
					popup.appendChild(galeria);
						galeria.appendChild(imagen);	
					popup.appendChild(boton_cerrar);
				body.appendChild(bloqueo);
		}
	
	
	function lanzarGaleria(imagenes,ubicacion,contenedor,cerrable,galeriaNombre,articuloId){			
			var carousel;
			var aCarousel = new Array();
            var el;
            var i;
            var page;
            var slides=new Array();
			var galeriaNombre;
			
			switch(cerrable){
				case true:
					var boton_cerrar = crear_elemento_html('img','boton_cerrar_galeria');
					boton_cerrar.setAttribute('target', contenedor.id); 
					boton_cerrar.src = c_path['popup'] + "cruz_cerrar.png";
					
					boton_cerrar.addEventListener(	
						'click',
						function(e){
							$('#'+e.currentTarget.getAttribute('target')).remove();
							$('.bloqueo').remove();
						}
					);	
					var bloqueo = crear_elemento_html('section','bloqueo');
					break;
				case false:
					var boton_cerrar = crear_elemento_html('img','boton_cerrar_inactivo');
					var bloqueo = crear_elemento_html('section','bloqueo_inactivo');
					break;
			}
				
				var galeria;
				if (articuloId!=undefined){
					galeria = crear_elemento_html('section',galeriaNombre,'galeria_articulo_'+articuloId);
				}else{
					galeria = crear_elemento_html('section',galeriaNombre);
				}
						
				contenedor.appendChild(galeria);			
				contenedor.appendChild(boton_cerrar);
			body.appendChild(bloqueo);
			
			for(iImagen in imagenes){
				var path=c_path[ubicacion]+imagenes[iImagen];			
				slides[iImagen]='<section class=imagen style="background-image:url('+path+'); width:'+$(contenedor).width()+'px; height:'+$(contenedor).height()+'px"></section>';				  
			}     
			
            //carousel = new SwipeView('.'+galeriaNombre, {	numberOfPages: slides.length,hastyPageFlip: true});	
			if (articuloId!=undefined){
				aCarousel[articuloId] = new SwipeView('#galeria_articulo_'+articuloId, {	numberOfPages: slides.length,hastyPageFlip: true});	
			}else{
				aCarousel[articuloId] = new SwipeView('.'+galeriaNombre, {	numberOfPages: slides.length,hastyPageFlip: true});	
			}
			
             // Load initial data
            for (i=0; i<3; i++) {
                  page = i==0 ? slides.length-1 : i-1;
                  el = document.createElement('span');
                  el.innerHTML = slides[page];
                  aCarousel[articuloId].masterPages[i].appendChild(el)
            }
			aCarousel[articuloId].onFlip(function () {
                              var el,
                              upcoming,
                              i;
                              for (i=0; i<3; i++) {
                              upcoming = aCarousel[articuloId].masterPages[i].dataset.upcomingPageIndex;
                              if (upcoming != aCarousel[articuloId].masterPages[i].dataset.pageIndex) {
                              el = aCarousel[articuloId].masterPages[i].querySelector('span');
                              el.innerHTML = slides[upcoming];
							  
                              }
                              }
                              
                              });
			
	}			