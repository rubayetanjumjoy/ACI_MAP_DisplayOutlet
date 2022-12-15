console.log('j')
let elementhtml = document.getElementById("amenities-search-bar");
let oldmarker = [];
let pointoldmarker=[];
var gpslat;
var gpslng;
var jsonlist = [];
//hide inspect
document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
}
//mapbox load
BANGLA_STYLE ='http://maps.codemaven.net/geocode/banglastyle/';
ENGLISH_STYLE='mapbox://styles/mapbox/streets-v11';
MAPBOX ='mapbox://styles/mapbox/streets-v11'
mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZGltaXJtYWthcm92MTcxIiwiYSI6ImNreTJsdGw0djBhZmwyb24xZ21ianN4Z2wifQ.wNcF-6rCTVkX3oRvBLL4YA';
var map = new mapboxgl.Map({
	container: 'map', // container ID
	style: ENGLISH_STYLE, // style URL
	center: [90.3510153, 23.7645784], // starting position [lng, lat]
	zoom: 12, // starting zoom
	 attributionControl: false
});
const marker1 = new mapboxgl.Marker()
		.setLngLat([90.3510153, 23.7645784])
		.addTo(map);
	oldmarker.push(marker1);


map.addControl(new mapboxgl.NavigationControl());
var geolocate = new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
// When active the map will receive updates to the device's location as it changes.
trackUserLocation: false,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
showUserHeading: true
});
map.addControl(geolocate);

geolocate.on('geolocate', function(e) {
      gpslng = e.coords.longitude;
      gpslat = e.coords.latitude
      var position = [gpslng, gpslat];
      console.log(position);


});







let button = document.getElementsByClassName("mapboxgl-ctrl-geolocate mapboxgl-ctrl-geolocate-active");
console.log(button);
button.click;


//reverse geocoding
map.on('click', function(e) {
    var direction_data;

    let latitude = e.lngLat.lat;
    let longitude = e.lngLat.lng;
     if (map.getLayer('route')) {
             map.removeLayer('route');
                }
    if (map.getSource('route')) {
                      map.removeSource('route');
             }
  $.ajax({
            type: 'GET',
            url: "/direction",
            data: {"latitude": latitude,"longitude": longitude,"gpslat":gpslat,"gpslng":gpslng},
            success: function (data) {
                // if not valid user, alert the user

                 direction_data=data

}


        });
    aci_reverse_api='http://maps.codemaven.net/geocode/reverse/details/?lat='+latitude+'&lng='+longitude+'';
    barikoi_revers='https://barikoi.xyz/v1/api/search/reverse/MTpPVkhCVEZaM09F/geocode?longitude='+longitude+'&latitude='+latitude+'';
    for (i = 0; i < pointoldmarker.length; i++) {
		pointoldmarker[i].remove();
	}


   fetch(aci_reverse_api, {
		method: "GET",
		mode: 'cors',

		headers: {
			"x-api-key": "4f7c2475ooa896481aff966e597bf0b6a1b8",

		}
	}).then(response => response.json()).then(json => {
        console.log("call");
        var marker1 = new mapboxgl.Marker()
		.setLngLat([longitude,latitude ])
		.addTo(map);
		pointoldmarker.push(marker1)


//if(document.getElementById('amenities-search-bar'))
//{
//document.getElementById('amenities-search-bar').remove();
//}
//if(document.getElementById('addresscontainer'))
//{
//document.getElementById('addresscontainer').remove();
//}
//var card=' <div id="addresscontainer"> <div class="amenities-search-bar" style="padding: 20px;" id="amenities-search-bar"><hr>  <h1 style="margin-top:30px;font-size:22px;overflow:hidden">'+json+'</h1> <p style="margin-top:20px; "><span style="font-weight:bold;color:blue">Thana </span>:'+json+'</p><p style="margin-top:20px; "><span style="font-weight:bold;color:blue">Area </span>:'+json+'</p> </div></div>'
//html = $.parseHTML( card);
//$("#appendcontainer").append(html);
if(document.getElementsByClassName('result_display_card'))
{
    for(i=0;i<document.getElementsByClassName('result_display_card').length;i++)
    {
        document.getElementsByClassName('result_display_card')[i].remove();
    }
}
var popupdisplay='<div class="result_display_card animate__animated animate__bounceIn" style="width: 30rem;"><div class="container-display"><i class="bi bi-geo-alt-fill "  style=" margin: auto;" ></i><h1 style="  text-align:center; overflow:hidden "  >'+json['result']+'</h1> <svg id="direction" style="margin:auto;cursor:pointer;" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" class="bi bi-send-fill" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/></svg></div> </div>'
html2 = $.parseHTML( popupdisplay);

$("#append_display_card").append(html2);
    //direction button click
    $(document).on("click", '#direction', function(event) {
                 for (i = 0; i < pointoldmarker.length; i++) {
		            pointoldmarker[i].remove();
                	}
                if (map.getLayer('route')) {
                     map.removeLayer('route');
                }
                if (map.getSource('route')) {
                      map.removeSource('route');
                }



                //draw direction line
                    map.addSource('route', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                'type': 'LineString',
                'coordinates':  direction_data,
                }
                }
                });
                    map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#43A6C6',
                'line-width': 8
                }
                });
            //polyline endpoint marker

            var el = document.createElement('div');
                            el.className = 'point_b';
              var point_b = new mapboxgl.Marker(el)
                    .setLngLat([longitude,latitude ])
                    .addTo(map);
                    pointoldmarker.push(point_b)






    //   var direction='<div id="addresscontainer"><div class="amenities-search-bar" style="padding: 15px;" id="amenities-search-bar"><hr><div class="row"><div class="col-lg-2"><svg style="margin-top:2px;"xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg></div><div class="col-lg-10"><input class="form-control" type="text" value="ACI Center,Tejgoan"></div></div><div class="row" style="margin-top:10px"><div class="col-lg-2"><svg style="margin-top:2px;"xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></div><div class="col-lg-10"><input class="form-control" type="text" placeholder="Default input" value="'+json['results']['Combined']+'"></div></div></div></div>'
   //     direction = $.parseHTML( direction);
        if(document.getElementById('addresscontainer'))
{
document.getElementById('addresscontainer').remove();
}
//        $("#appendcontainer").append(direction);
    });

console.log("clicked");



	});



})




console.log(elementhtml);


//livesearch
document.getElementById("livesearch").addEventListener("keyup", myFunction);

function myFunction() {
	var x = document.getElementById("livesearch");
	const element = document.getElementById("amenities-search-bar");
	if (element) {
		element.remove();
	}

	var url1 = 'https://barikoi.xyz/v1/api/search/autocomplete/MTpPVkhCVEZaM09F/place?q=' + x.value + ''
	const aciapi = 'http://maps.codemaven.net/geocode/search/?token=' + x.value + ''


	//mis
	fetch(aciapi, {
		method: "GET",
		mode: 'cors',
		headers: {
			"x-api-key": "4f7c2475ooa896481aff966e597bf0b6a1b8",
		}
	}).then(response => response.json()).then(json => {



		var addresscontainer = document.getElementById("addresscontainer");
		if (addresscontainer) {
			addresscontainer.remove();
		}

        var livesearch = document.getElementById("livesearch").value;
        if(livesearch=="")
        {

        document.getElementById("appendcontainer").appendChild(elementhtml);
        document.getElementById("addresscontainer").remove();
        }


        console.log(livesearch);
		const node = document.createElement("ul");
		node.setAttribute("id", "addresscontainer");
		node.setAttribute("class", "list-group");

		document.getElementById("search-results").appendChild(node);

		for (i = 0; i < json['results'].length; i++) {

			jsonlist[i] = json['results'][i]

			const div = document.createElement("div");

			div.setAttribute("class", "list-group-item list-group-item-action x ");


			document.getElementById("addresscontainer").appendChild(div);
			const icon = document.createElement("i");

			icon.setAttribute("class", "  bi bi-geo-alt-fill");

			document.getElementsByClassName("x")[i].appendChild(icon);

			const node = document.createElement("a");
			node.setAttribute("class", "addr");


			node.setAttribute("id", json['results'][i]['location']['lat']);


			const textnode = document.createTextNode(json['results'][i]['Combined']);
			node.appendChild(textnode);
			document.getElementsByClassName("x")[i].appendChild(node);



		}



	}).catch(error => {
       console.log(error);
       //document.getElementById("addresscontainer").remove();
    });




}

//search results click event
$(document).on("click", '.addr', function(event) {
	lng = '';
	lat = '';


	var stringid = $(this).attr('id');
	var id = parseFloat(stringid);;
	 
	for (let i = 0; i < jsonlist.length; i++) {

		if (id == parseFloat(jsonlist[i]['location']['lat'])) {
		     console.log(jsonlist[i]['location']['lat'])
		     console.log(jsonlist[i]['location']['lon'])
			lat = jsonlist[i]['location']['lat'];
			lng = jsonlist[i]['location']['lon'];

		};

	};

	for (i = 0; i < oldmarker.length; i++) {
		oldmarker[i].remove();
	}
	map.flyTo({

		center: [
			lng,
			lat
		],
		zoom: 16,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});

	const marker1 = new mapboxgl.Marker()
		.setLngLat([lng, lat])
		.addTo(map);
	oldmarker.push(marker1);





});
//nearbybutton
function nearbybutton(type) {

	for (i = 0; i < oldmarker.length; i++) {
		oldmarker[i].remove();
	}
	let markers = [];

	const center = map.getCenter();
	const {
		lng,
		lat
	} = map.getCenter();
	nearbyapi = 'https://barikoi.xyz/v1/api/search/nearby/category/MTpPVkhCVEZaM09F/0.5/10?longitude=' + lng + '&latitude=' + lat + '&ptype=' + type + '';
	fetch(nearbyapi)
		.then(response => response.json())
		.then(data => {
		    console.log(data.status);

            for (i=0; i<oldmarker.length;i++)
            {
            oldmarker[i].remove();
            }
            if (data.status!=200){
            const node = document.createElement("ul");
		    node.setAttribute("id", "addresscontainer");
		    node.setAttribute("class", "list-group");

		    document.getElementById("search-results").appendChild(node);
			//adding markers into the map

			for (i = 0; i < data['Place'].length; i++) {

                 var el = document.createElement('div');
                el.className = type;
               console.log(type);

                            markers[i] = new mapboxgl.Marker( el)
                                .setLngLat([data['Place'][i]['longitude'], data['Place'][i]['latitude']]).setPopup(
                new mapboxgl.Popup( { offset: 25 }) // add popups
                  .setHTML(
                    '<h1 style="font-size:20;font-weight:bold;">'+data["Place"][i]['name']+'</h1><h1 style="margin-top:5px;">    '+data["Place"][i]['Address']+'</h1>'
                  )
              )
					.addTo(map);


				const element = document.getElementById("amenities-search-bar");


				if (element) {
					element.remove();
				}
				oldmarker[i] = markers[i];
				console.log(elementhtml)
					const div = document.createElement("div");

			div.setAttribute("class", "list-group-item list-group-item-action x ");


			document.getElementById("addresscontainer").appendChild(div);
			const icon = document.createElement("i");

			icon.setAttribute("class", "  bi bi-geo-alt-fill");

			document.getElementsByClassName("x")[i].appendChild(icon);

			const node = document.createElement("a");



			node.setAttribute("id", data['Place'][i]['id']);


			const textnode = document.createTextNode(data['Place'][i]['Address']);
			node.appendChild(textnode);
			document.getElementsByClassName("x")[i].appendChild(node);



			}
		 }else
		 {
            const node = document.createElement("ul");
		    node.setAttribute("id", "addresscontainer");
		    node.setAttribute("class", "list-group");

		    document.getElementById("search-results").appendChild(node);
		    const div = document.createElement("div");

			div.setAttribute("class", "list-group-item list-group-item-action x ");


			document.getElementById("addresscontainer").appendChild(div);
			const icon = document.createElement("i");

			icon.setAttribute("class", "  bi bi-geo-alt-fill");

			document.getElementsByClassName("x")[0].appendChild(icon);
			const a = document.createElement("a");
			const textnode = document.createTextNode('No '+type +' Found');
			a.appendChild(textnode);
			document.getElementsByClassName("x")[0].appendChild(a);
			const element = document.getElementById("amenities-search-bar");


				if (element) {
					element.remove();
				}


		 }
		document.getElementById("search_icon").className = "bi bi-house";








		});
}
//nearby buttons clicks events
$(document).on("click", '.restaurant', function(event) {
	type = 'cafe';
	console.log('as')
	nearbybutton(type);
});

$(document).on("click", '.bus_stop', function(event) {
	type = 'bus stand';
	nearbybutton(type);
});
$(document).on("click", '.gas_station', function(event) {
	type = 'Fuel';
	nearbybutton(type);
});
$(document).on("click", '.atm', function(event) {
	type = 'Bank';
	nearbybutton(type);
});
$(document).on("click", '.shopping_mall', function(event) {
	type = 'shopping';
	nearbybutton(type);
});
$(document).on("click", '.pharmacy', function(event) {
	type = 'Healthcare';
	nearbybutton(type);
});
$(document).on("click", '.hotels', function(event) {
	type = 'hotel';
	nearbybutton(type);
});

//search icon click
$(document).on("click", '#search_icon', function(event) {
	document.getElementById("livesearch").value="";


if (map.getLayer('route')) {
  map.removeLayer('route');
}
if (map.getSource('route')) {
  map.removeSource('route');
}
    for(i=0;i<oldmarker.length;i++)
    {
        oldmarker[i].remove();
    }
     for(i=0;i<pointoldmarker.length;i++)
    {
        pointoldmarker[i].remove();
         console.log(pointoldmarker[i]);
    }


    console.log(pointoldmarker);


    if(document.getElementsByClassName('result_display_card'))
{
    for(i=0;i<document.getElementsByClassName('result_display_card').length;i++)
    {
        document.getElementsByClassName('result_display_card')[i].remove();
    }
}
	if (document.getElementById("addresscontainer") != null) {
        document.getElementById("search_icon").className = "bi bi-house";
		document.getElementById("addresscontainer").remove();
		for (i = 0; i < oldmarker.length; i++) {
			oldmarker[i].remove();
		}

	}
     document.getElementById("search_icon").className = "bi bi-search";
	document.getElementById("appendcontainer").appendChild(elementhtml);



});
//bangla and english button
$(document).on("click", '#bangla', function(event) {

document.getElementById("english").className = "language-btn-not-selected";
document.getElementById("bangla").className = "language-btn-selected";





 map.setStyle(BANGLA_STYLE);


});
$(document).on("click", '#english', function(event) {
    window.location.reload();
});

//resurent drop down clcik

/*$(document).on("click", '.resturent', function(event) {
	lng = '';
	lat = '';

	console.log(jsonlist);
	var id = $(this).attr('id');


	for (let i = 0; i < jsonlist['places'].length; i++) {
		if (id == jsonlist['places'][i]['id']) {
			lng = jsonlist['places'][i]['longitude'];
			lat = jsonlist['places'][i]['latitude'];

		};

	};

	for (i = 0; i < oldmarker.length; i++) {
		oldmarker[i].remove();
	}
	map.flyTo({
		center: [
			lng,
			lat
		],
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});

	const marker1 = new mapboxgl.Marker()
		.setLngLat([lng, lat])
		.addTo(map);
	oldmarker.push(marker1);




});*/
