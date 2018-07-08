import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Category, SubCategory, Business } from '@app/typings/types';


@Component({
  selector: 'businessmap',
  templateUrl: './business-map.component.html',
  styleUrls: ['./business-map.component.scss']
})
export class BusinessMapComponent implements OnInit {

  @ViewChild('map1') map1;
  categorys$: Observable<Category[]>;
  subcategory$: Observable<SubCategory[]>;
  nearbyBusiness$: Observable<Business[]>
  nearbyBusiness: Business[];

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  lat = -34.397;
  lng = 150.644;
  latA = -34.754764;
  lngA = 149.736246;
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
    maxDistance: 5,
    limit: 0
  }

  currentMedia: string;

  constructor(public _media: ObservableMedia) { }

  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  success = (pos) => {
    var crd = pos.coords;
    this.currentLoc.lat = crd.latitude;
    this.currentLoc.long = crd.longitude;
    this.currentLoc.maxDistance = 5;
    this.currentLoc.limit = 5;
    //this.store.dispatch(new businessActions.GetAllBusinessNearbyAction(this.currentLoc));
  };

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  ngOnInit() {
    this._media.subscribe((change: MediaChange) => {
      this.map1.triggerResize().then(() => this.map1._mapsWrapper.setCenter({
        lat: this.lat,
        lng: this.lng
      }));
      this.currentMedia = change.mqAlias;
    });
    // this.categorys$ = this.store.select(businessSelector.getCatsForSelectedAddBiz);
    // this.subcategory$ = this.store.select(businessSelector.getSubCatsForSelectedAddCat);
    // this.store.select(businessSelector.getAllBusiness).subscribe(biz => {
    //   this.nearbyBusiness = biz
    // });
    // this.nearbyBusiness$ = this.store.select(businessSelector.getAllBusiness)

    navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  }
}
