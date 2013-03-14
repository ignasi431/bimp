function galeriaPrincipal(){

var	carousel,
el,
i,
page,
slides = imagenesGaleria;
			
			
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
			

			el = carousel.masterPages[i].querySelector('span');			
			el.innerHTML = slides[upcoming];
			
			
		}
	}
});

}
	

function abreImagenGaleria(){
	backKeyAction='cerrar_galeria_mapa';
//mostramos las capas relacionadas con la galeria
		
$("#contenedorImagenGaleria").show();
$("#contenedorImagenGaleriaCerrar").show();
mostrarOpacidad();
$("#contenedorGuiaImagenGaleria").show();

	
	var	carousel,
		el,
		i,
		page,
		slides = imagenesGaleriaGrande;
	
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
			}else if(carousel.masterPages[i].className=="swipeview-active") {
			 	$("#nav li").attr("class",""); 
				$("#" + carousel.masterPages[i].dataset.pageIndex).attr("class", "selected");
			}
		}

                $('#contenedorImagenGaleria span img').height($('#contenedorImagenGaleria span').height());
	});
	
	
	$("#contenedorImagenGaleria").css("position", "absolute");

        $('#contenedorImagenGaleria span img').height($('#contenedorImagenGaleria span').height());	

}


function gmaps(){
    
    $("#contenedorMapa").show();
    $("#contenedorMapaCerrar").show();
    mostrarOpacidad();
    $(".cContenedorMapaCerrar").show();
    

    var map = new GMaps({
                    div: '#contenedorMapa',
                    lat: -12.043333,
                    lng: -77.028333
                    });

    
    map.drawRoute({
                  origin: [-12.044012922866312, -77.02470665341184],
                  destination: [-12.090814532191756, -77.02271108990476],
                  travelMode: 'driving',
                  strokeColor: '#131540',
                  strokeOpacity: 0.6,
                  strokeWeight: 6
                  });
    
    map.addMarker({
                  lat: -12.044012922866312,
                  lng: -77.02470665341184,
                  title: 'Lima',
                  click: function(e) {
                  alert('You clicked in this marker');
                  }
                  });
    
    map.addMarker({
                  lat: -12.090814532191756,
                  lng: -77.02271108990476,
                  title: 'Lima',
                  click: function(e) {
                  alert('You clicked in this marker');
                  }
                  });
}


function pintaMapaGPS2(){
    backKeyAction='cerrar_galeria_mapa';
    //mostramos las capas relacionadas con el mapa
    $("#contenedorMapa").show();
    $("#contenedorMapaCerrar").show();
    mostrarOpacidad();
    $(".cContenedorMapaCerrar").show();
    
    var map;
    var latitud;
    var longitud;
    var precision;
    var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    
    
    
    localizame();
    
    
    
    function initialize(latitud,longitud) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var bar = new google.maps.LatLng(oCard.latitud,oCard.longitud);
        var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: bar
        }
        map = new google.maps.Map(document.getElementById("contenedorMapa"), myOptions);
        directionsDisplay.setMap(map);
        calcRoute(latitud,longitud);
    }
    
    function calcRoute(latitud,longitud) {
        
        var waypts = [];
        
        
        
        start  = new google.maps.LatLng(latitud,longitud);
        end = new google.maps.LatLng(oCard.latitud,oCard.longitud);
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

function pintaMapaGPS(){
	backKeyAction='cerrar_galeria_mapa';
//mostramos las capas relacionadas con el mapa
$("#contenedorMapa").show();
$("#contenedorMapaCerrar").show();	
mostrarOpacidad();
$(".cContenedorMapaCerrar").show();
	
	
		var map;
        var latitud;
        var longitud;
        var precision;
        
        $(document).ready(function() {
            localizame();    
        });
        
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
           // alert(precision);
            cargarMapa();
           
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
         
        function cargarMapa() {

				map = new GMaps({
					        div: '#contenedorMapa',
					        lat: latitud,
					        lng: longitud
				        });
		
		map.addMarker({
		  lat: latitud,
		  lng: longitud,
		  title: 'Lima',
		  click: function(e) {
		  }
		});

		map.addMarker({
			  lat: oCard.latitud,
			  lng: oCard.longitud,
			  title: 'Lima',
			  click: function(e) {
			  }
			});		
			        
			map.drawRoute({
			  origin: [latitud, longitud],
			  destination: [oCard.latitud, oCard.longitud],
			  travelMode: 'walking',
			  strokeColor: '#131540',
			  strokeOpacity: 0.6,
			  strokeWeight: 6
			});

               // $('#contenedorMapa').html('<div class="cContenedorMapaCerrar" onclick="cerrarMapa()"></div>');
      }

}

function cerrarGaleria(){
	backKeyAction='back2bred';
	$("#contenedorImagenGaleria").hide();
	$("#contenedorImagenGaleriaCerrar").hide();
        $(".opacidad").hide();
        $("#contenedorGuiaImagenGaleria").hide();
}

function cerrarMapa(){
	backKeyAction='back2bred';
	$("#contenedorMapa").hide();
	$("#contenedorMapaCerrar").hide();
    $(".opacidad").hide();
    $(".cContenedorMapaCerrar").hide();
}
