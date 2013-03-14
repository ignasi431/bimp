//document.addEventListener("deviceready", getGeolocation, false);

var jsonPosition;
var jsonPositionError;
var latitud = 0;
var longitud = 0;
var presicion = 10000;
var margen_error_max = 0.0002;
var geoPosition;
var oDataPeticionWS_inicializado = false;

function arrancarGeoInfo() { 
	//print_console("Explorando GEO"); 
    navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
}


function getDataWS() { 
    navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
}


function getPosition(){
	
	var Position;
	switch (plataforma){
		case "web":
			var	 jsonPosition = '{"coords":{"latitude":41.4337,"longitude":2.1720,"accuracy":65,"altitude":76.2304,"heading":-1,"speed":-1,"altitudeAccuracy":10},"timestamp":"2012-07-10T09:45:41.318Z"}';
			Position =   eval('(' + jsonPosition + ')');
		break;
		case "app":
			Position = geoPosition;
		break;
		default:
			Position = geoPosition;
		break;
		 	
	}
	var time=new Date().getTime();
	  
	 
    //alert("jsonPosition:" + jsonPosition);
    return Position;
}
var onSuccess = function(position) {   
//	//print_console("Geo exito");
    if(seHaDesplazado(position)){
        actualizaPosition(position);
    }else if(tenemosMedicionMasPrecisa(position)){
        actualizaPosition(position);
    }
     
};

function onError(error) {
//	//print_console("Geo fracaso"); 
    jsonPositionError = JSON.stringify(error);	
}
function getJsonPosition(){

	var jsonPosition;
	switch (plataforma){
		case "web":
			jsonPosition = '{"coords":{"latitude":41.4337,"longitude":2.1720,"accuracy":65,"altitude":76.2304,"heading":-1,"speed":-1,"altitudeAccuracy":10},"timestamp":"2012-07-10T09:45:41.318Z"}';
		break;
		case "iphone":
			jsonPosition = JSON.stringify(geoPosition);
		break;
		default:
			jsonPosition = JSON.stringify(geoPosition);
		break;
		 	
	}
	var time=new Date().getTime();
	   //print_console("Device Ready"+time); 
	   //print_console("Geo :"+jsonPosition);
    //alert("jsonPosition:" + jsonPosition);
    return jsonPosition;
}

function seHaDesplazado(position){
    var diferencia_lon = Math.abs(longitud-position.coords.longitude);
    var diferencia_lat = Math.abs(latitud-position.coords.latitude);
    if(diferencia_lon > margen_error_max && diferencia_lat > margen_error_max){
        return true;
    }else{
        return false;
    }
}
function tenemosMedicionMasPrecisa(position){
    if(position.coords.accuracy < presicion){
        return true;
    }else{
        return false;
    }
}

function actualizaPosition(position){
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    presicion = position.coords.accuracy;
    geoPosition = position;
}