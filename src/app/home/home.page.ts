import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  map!: L.Map;
  
  ngOnInit(){
    //Accessing Device Location
      if(!navigator.geolocation){
        console.log('location not supported')
      }
      navigator.geolocation.getCurrentPosition((position) => {
        let coord = position.coords;
        //Accessing Device Location - END

        //Integrate leaflet
        this.map = L.map('mapId').setView([coord.latitude, coord.longitude], 20);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">MOpenStreetap</a> contributors'
        }).addTo(this.map);
            //Marker    
        
        L.marker([coord.latitude, coord.longitude]).addTo(this.map)
        .bindPopup("You're Here")
        .openPopup();
      });


      this.watchPosition();
  }
  watchPosition(){
  
    let id = navigator.geolocation.watchPosition((position) =>{
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
 
    },(err) => {
      console.log(err);
    },{
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    })
  }
}
