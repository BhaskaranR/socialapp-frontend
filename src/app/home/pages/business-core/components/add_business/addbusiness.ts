import { Component, ChangeDetectionStrategy, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MapsAPILoader } from '@agm/core';
import { Category, SubCategory } from '@app/typings/types';

declare var google:any;

@Component({
  templateUrl: './addbusiness.html',
  styleUrls: ['./addbusiness.scss'],
})

export class AddBusinessComponent {
  form: FormGroup;
  businessNames$: Observable<string[]>;
  categorys$: Observable<Category[]>;
  subcategory$: Observable<SubCategory[]>;
  subcategories: SubCategory[];
  selectedBusinessSub: Subscription;
  selectedCategorySub: Subscription;
  selectedSubCategorySub: Subscription;

  _selectedBusiness: string
  get selectedBusiness() {
    return this._selectedBusiness;
  }

  set selectedBusiness(val : string){
    if(val == this._selectedBusiness || val == undefined) return;
     this._selectedBusiness = val;
    // this.store.dispatch(new businessActions.AddNewBizAction(val));
  }

  _selectedCat: string
  get selectedCat() {
    return this._selectedCat;
  }

  set selectedCat(val : string){
    if(val == this._selectedCat || val == undefined) return;
    this._selectedCat = val;
    // this.store.dispatch(new businessActions.AddNewBizCategoryAction(val));
  }

    _selectedSubCat: string
  get selectedSubCat(){
    return this._selectedSubCat;
  }
  set selectedSubCat(val : string){
    if(val == this._selectedSubCat || val == undefined) return;
     this._selectedSubCat = val;
  }

 
 @ViewChild('addresscontainer')
 addresscontainer : ElementRef;

  public constructor(
		private _loader: MapsAPILoader,
		private _zone: NgZone,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddBusinessComponent>,
    private formBuilder: FormBuilder) {
      this.autocomplete();
  }

  ngOnInit() {

  // this.store.dispatch(new businessActions.GetAllCategories());
  // this.businessNames$ =  this.store.select(businessSelector.getAllBusinessNames);

  // this.categorys$ = this.store.select(businessSelector.getCatsForSelectedAddBiz);
  // this.subcategory$ = this.store.select(businessSelector.getSubCatsForSelectedAddCat);
  // this.store.select(businessSelector.getSubCatsForSelectedAddCat).subscribe((subcats) =>{
  //   this.subcategories = subcats;
  //   console.log(subcats);
  // })

  this.form = this.formBuilder.group({
      'title': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      'bizname': ['', [Validators.required]],
      'categoryId': ['', [Validators.required]],
      'subcategoryId': [''],
      'address':['', [Validators.required]],
      'website': ['']
    });
  }

  lat: string;
  lng: string;

  autocomplete() {
		this._loader.load().then(() => {
				var autocomplete = new google.maps.places.Autocomplete(this.addresscontainer.nativeElement, {});
				google.maps.event.addListener(autocomplete, 'place_changed', () => {
						this._zone.run(() => {
							var place = autocomplete.getPlace();
              this.lat = place.geometry.location.lat();
							this.lng = place.geometry.location.lng();
							
						/*	this.markers.push(new Marker (
								place.geometry.location.lat(),
								place.geometry.location.lng(),
								place.name,
								false
							));
							
							this.lat = place.geometry.location.lat();
							this.lng = place.geometry.location.lng();
							
							console.log(place);
							console.log(this.markers);*/
						});
				});
		});
	}
  

  geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          return circle;
        });
      }
  }

  close(event: Event) {
    this.dialogRef.close();
  }

  filterSubCat(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.subcategories.filter(state => state.name.toLowerCase().startsWith(filterValue));
    }

    return this.subcategories;
  }

  onSubmit(event: Event) {
    if (this.form.valid) {
      let formObject = Object.assign(this.form.value, { 'long': this.lng, 'lat': this.lat });
     // this.store.dispatch(new businessActions.AddNewBusinessAction(formObject));
      this.close(event);
    }
  }
}
