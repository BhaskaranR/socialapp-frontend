import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  options: any;
  error: any;
  showId:any;
  locData: any[];
  currentMedia: string;

  zoom = 18;

  styles: any = [{
    featureType: 'all',
    stylers: [{
      saturation: -80
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      hue: '#00ffee'
    }, {
      saturation: 50
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];


  currentLoc = {
    long: 0,
    lat: 0,
    bizName: ''
  }

  @ViewChild('map1') map1;

  constructor(public dialogRef: MatDialogRef<CheckinComponent>,
    public _media: ObservableMedia) {
      this.showId = false;
    }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
    this._media.subscribe((change: MediaChange) => {
      this.map1.triggerResize().then(() => this.map1._mapsWrapper.setCenter({
        //   lat: this.lat,
        //   lng: this.lng
      }));
      this.currentMedia = change.mqAlias;
    });
  }
  success = (pos) => {
    var crd = pos.coords;
    this.currentLoc = {
      long: crd.longitude,
      lat: crd.latitude,
      bizName: ''
    }
    this.searchForLocation(this.currentLoc);
  };
  search(e:any){
  this.currentLoc.bizName = e.target.value;
  this.searchForLocation(this.currentLoc);
  }
  searchForLocation(coords: object){
  // this.businessservice.getPlacesNearby(coords).subscribe(
  //     (loc: Nearby) => {
  //       this.locData = loc.google;
  //     }
  //   );
}
  checkin(loc: any) {
    this.dialogRef.close({
      type: 'Point',
      coordinates: loc.geotag.coordinates,
      title: loc.title,
      placeId: loc._id
    });
  }

  toggleId() {
    this.showId = !this.showId;
  }
}
