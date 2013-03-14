function galeriaPrincipal(){


var	carousel,
el,
i,
page,
slides = imagenesGaleria;
			
/*
'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/ardilla.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/lola.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/susana.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/ardilla.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/lola.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/susana.png">',
		'<img onclick="abreImagenGaleria()" src="imagenes/personajes/americano/nuria.png">'

*/			
	
carousel = new SwipeView('#wrapper', {
	numberOfPages: slides.length,
	hastyPageFlip: true
});

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

			for(var i in nombreImagenesGaleria){
				document.getElementById(nombreImagenesGaleria[i]).setAttribute("class", "");
			}
			
			for(var i in nombreImagenesGaleria){
				if (slides[upcoming].indexOf(nombreImagenesGaleria[i]) != -1){
				document.getElementById(nombreImagenesGaleria[i]).setAttribute("class", "selected");
				}
			}
			

			el = carousel.masterPages[i].querySelector('span');			
			el.innerHTML = slides[upcoming];
			
			
		}
	}
});

}

galeriaPrincipal();

//---------------MAPA GPS
function pintaMapaGPS(){

//mostramos las capas relacionadas con el mapa

	
	
		var map;
        var latitud;
        var longitud;
        var precision;
        var directionDisplay;
        var directionsService = new google.maps.DirectionsService();
    
  
        $("#contenedorMapa").css("display", "");
        $("#contenedorMapaCerrar").css("display", "");
   
        localizame();
    

            
      
    
    function initialize(latitud,longitud) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var chicago = new google.maps.LatLng(41.387917,2.169919);
        var myOptions = {
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago
        }
        map = new google.maps.Map(document.getElementById("contenedorMapa"), myOptions);
        directionsDisplay.setMap(map);
        calcRoute(latitud,longitud);
    }
    
    function calcRoute(latitud,longitud) {
        
        var waypts = [];

        
        
        start  = new google.maps.LatLng(latitud,longitud);
        end = new google.maps.LatLng(41.450137,2.24742);
        var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                var route = response.routes[0];
                                
                                }
                                });
    }
        
        function localizame() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(coordenadas, errores, {maximumAge:3000});
            }else{
                alert('Oops! Tu navegador no soporta geolocalización. Bájate Chrome, que es gratis!');
            }
        }
        
        function coordenadas(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            precision = position.coords.accuracy;
            initialize(latitud,longitud);
           
        }
        
        function errores(err) {
            if (err.code == 0) {
              alert("Oops! Algo ha salido mal");
            }
            if (err.code == 1) {
              alert("Oops! No has aceptado compartir tu posición");
            }
            if (err.code == 2) {
              alert("Oops! No se puede obtener la posición actual");
            }
            if (err.code == 3) {
              alert("Oops! Hemos superado el tiempo de espera");
            }
        }

}


//-------------FIN MAPA GPS

function abreImagenGaleria(){
//mostramos las capas relacionadas con la galeria
		
$("#contenedorImagenGaleria").css("display", "");
$("#contenedorImagenGaleriaCerrar").css("display", "");
	
	var	carousel,
		el,
		i,
		page,
		slides = [
			'<img src="imagenes/personajes/americano/ardilla.png">',
			'<img src="imagenes/personajes/americano/lola.png">',
			'<img src="imagenes/personajes/americano/susana.png">',
			'<img src="imagenes/personajes/americano/ardilla.png">',
			'<img src="imagenes/personajes/americano/lola.png">',
			'<img src="imagenes/personajes/americano/susana.png">',
			'<img src="imagenes/personajes/americano/nuria.png">'
		];
	
	carousel = new SwipeView('#contenedorImagenGaleria', {
		numberOfPages: slides.length,
		hastyPageFlip: true
	});
	
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
	
	
	$("#contenedorImagenGaleria").css("position", "absolute");	

}

function getPintadoGallery(){
    var url = "http://barcelonainmypocket.com/app2/swInline.php";
    $.ajax({
           type: "POST",
           url: url,
           success: function(data) {
           		var respData = $.trim(data);
           		$("#gallery").html(respData);
           },
           error: function(jqXHR, textStatus, errorThrown) {
           
           alert("jqXHR  :" + jqXHR);
           alert("textStatus  :" + textStatus);
           alert("errorThrown  :" + errorThrown);
           },
           });
}

function scroll(article){
	var positionTop= $("#" + article).position().top;
	scroll1.scrollTo(0, 0-positionTop, 200);
}

function cerrarGaleria(){
	$("#contenedorImagenGaleria").hide();
	$("#contenedorImagenGaleriaCerrar").hide();
}

function cerrarMapa(){
	$("#contenedorMapa").hide();
	$("#contenedorMapaCerrar").hide();
}
