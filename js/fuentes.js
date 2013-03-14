
            /*************** funciones para el tamaño de las fuentes ***********************/
            var t_letra_titulo, t_letra_texto, t_letra_ratings,t_letra_num_comentario, t_letra_comentario,t_letra_edad, t_letra_boton, t_letra_mosaico,t_letra_volver,t_letra_promo;
            
			    var ratio_letra_boton = 0.24;
			
			var ratio_letra_volver = 0.2823;	
			var ratio_letra_edad = 0.3125;
			var ratio_letra_rango = 0.425;
			var ratio_letra_num_comentario = 0.425;
            var ratio_letra_comentario = 0.205;
			var ratio_nombre_cabecera=0.28;
            var ratio_letra_ratings = 0.24;
			var ratio_letra_promo = 0.200;
        
            var ratio_letra_mosaico = 0.19;
             
           
            
            
            function getSizeTextos(){
                var width = $('.panel_derecho').width();
                
                t_letra_boton = (ratio_letra_boton * altura) + "%";	
                t_letra_volver  = (ratio_letra_volver * altura) + "%";
                t_letra_edad  = (ratio_letra_edad * width) + "%";
                t_letra_rango  = (ratio_letra_rango * width) + "%";
                t_letra_num_comentario  = (ratio_letra_num_comentario * width) + "%";
                t_letra_comentario  = (ratio_letra_comentario * width) + "%";
                t_nombre_cabecera = (ratio_nombre_cabecera * width) + "%";
				 t_letra_ratings  = (ratio_letra_ratings * width) + "%";
				
                t_letra_promo  = (ratio_letra_promo * (width)) + "%";
                t_letra_mosaico = (ratio_letra_mosaico * width) + "%";
             
                
                
                font_size();
              
            }
            function font_size(){
    			
                $(".boton .nombre").css("font-size",t_letra_boton);
				$(".volver").css("font-size",t_letra_volver);
				$(".edad .texto").css("font-size",t_letra_edad);
				$(".edad .rango").css("font-size",t_letra_rango);
				$(".quick_comentario .numero").css("font-size",t_letra_num_comentario);
				$(".quick_comentario .comentarios").css("font-size",t_letra_comentario);
				$(".cabecera .nombre").css("font-size",t_nombre_cabecera);
				$(".texto_rating_box").css("font-size",t_letra_ratings);
				$(".promo").css("font-size",t_letra_promo);
				$(".mosaico .texto").css("font-size",t_letra_mosaico);
           
                 
             }