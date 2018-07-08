import { CheckinComponent } from '../checkin/checkin.component';
import { Component, Inject, Renderer, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FileUploader, Headers } from 'ng2-file-upload';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { NewPromoPostComponent } from '../newpromopost/newpromopost.component';
import { UserGroupListComponent } from '../usergroup/usergroup-list.component';

// import { FiltersPageComponent } from '../../photo-filter/filters-page';
// import { FiltersService } from '../../photo-filter/filter-data/services/filters-service';
import { User, UserGroup, GeotagInput } from '@app/typings/types';

@Component({
  templateUrl: './newpost.html',
  styleUrls: ['./newpost.scss']
})
export class NewPostComponent implements OnInit, OnDestroy {
  icon: string;
  mentionedUsers: any = [];
  mentionList: any;
  // success: any;
  locData: any;
  people: any;
  items: any[];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;
  private uuid: string;
  form: FormGroup;
  imagePreviewThumbnail: any[];
  // imagePreview$: Observable<PhotoDetails[]>;
  photosPath: string;
  preference: string = "public";
  imageUrl: any = new Array();
  @ViewChild('fileInput') fileInput: ElementRef;
  private subscriptions: Subscription[] = []
  // public filterdialogRef: MatDialogRef<FiltersPageComponent>;

  user$: Observable<User>;

  public userGrp: UserGroup[] = [];
  selectedPage: UserGroup;
  uploadFile: any;


  selectedLocation: GeotagInput = null;
  public constructor(
    public dialog: MatDialog,
    // public filterService: FiltersService,
    public dialogRef: MatDialogRef<NewPostComponent>,
    public promoPostDialogRef: MatDialogRef<NewPromoPostComponent>,
    public groupListdialogRef: MatDialogRef<UserGroupListComponent>,
    @Inject('apiBase') private apiBase: string,
    private formBuilder: FormBuilder,
    private authHttp: AuthHttp) {
  }
  private getPeople() {
  }
  ngOnInit() {
    // this.store.dispatch(new profileActions.GetMyFollowingAction());
    // this.subscriptions.push(this.store.select(userSelector.getMyFollowingWithAction).subscribe(p => {
    //   var names: any = [];
    //   p.forEach(item => {
    //     if (item.entity) {
    //       names.push(item.entity)
    //     }
    //   });
    //   this.items = names;
    // }));
    // this.user$ = this.store.select(profileSelector.getMe);
    // this.subscriptions.push(this.store.select(imageSelector.getAll).subscribe((photos) => {
    //   this.imagePreviewThumbnail =  photos;
    // }));
    // this.subscriptions.push(this.store.select(businessSelector.getMyBizGroupWithSettings).subscribe(bgrp => {
    //   this.userGrp = bgrp;
    // }));
    let tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      let authHeaders: Headers = { name: 'Authorization', value: `Bearer${tokens.access_token}` };
      this.uploader = new FileUploader({ url: `${this.apiBase}/posts/new/file`, headers: [authHeaders], disableMultipart: false });
    }
    this.uploader.onAfterAddingAll = f => {
      // this.store.dispatch(new imageUploadActions.UploadTempPhotoAction(f));
      this.uploader.uploadAll();
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      // const resp: PhotoDetails = JSON.parse(response);
      // this.store.dispatch(new imageUploadActions.UploadTempPhotoActionSuccess([resp]));
    };
    this.uuid = UUID.UUID();
    this.form = this.formBuilder.group({
      text: [''],
      mentions: [''],
      selectedLocation: null
    });
    this.uploader.onBuildItemForm = (fileItem: any, frm: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(fileItem._file);
      reader.onload = (e) => {
        this.imageUrl.push(e.target['result']);
      }
      frm.append('clientId', this.uuid);
    };
  }

  removeSelectedLocation() {
    this.selectedLocation = null;
    this.form.controls["selectedLocation"].setValue(null);
  }

  UploadClick(event: Event) {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    event.preventDefault();
  }


  editPhoto(photo: any) {
    // this.filterService.changeSelectImage(photo.small);
    // this.store.dispatch(new imageUploadActions.EditPhotoAction(photo.key));
    // this.filterdialogRef = this.dialog.open(FiltersPageComponent, {
    //   panelClass: 'filterimagepane-class'
    // });
    // this.filterdialogRef.afterClosed()
    // .subscribe(result => {
    //   if(result.applyFilter) {
    //     const editphoto = Object.assign({
    //       clientId: this.uuid,
    //       key: photo.key
    //     }, result.applyFilter);
    //     this.filterService.changeSelectImage(null);
    //     this.store.dispatch(new imageUploadActions.ChangePhotoAction(editphoto));
    //   }
    //   this.filterdialogRef = null;
    // });
    // event.preventDefault();
  }


  removePhoto(photo: string) {
    //this.store.dispatch(new imageUploadActions.RemoveTempPhotoAction(photo));
  }

  // TODO Remove from server Later..
  close(event: Event) {
    //this.store.dispatch(new imageUploadActions.RemoveAllTempPhotoAction(this.uuid));
    this.dialogRef.close();
    event.preventDefault();
  }

  openPostByDialog() {
    this.groupListdialogRef = this.dialog.open(UserGroupListComponent, {
      disableClose: false,
      hasBackdrop: false,
      panelClass: 'custom-overlay-usergrp-class',
      data: { userGroups: this.userGrp }
    });
    this.groupListdialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        if (result == 'public' || result == 'private' || result == 'friends') {
          this.preference = result;
          this.icon="public";
          if(result == 'public'){
            this.icon="public";
          }
          if(result == 'private'){
          this.icon="lock";
          }
          if(result == 'friends'){
            this.icon="group";
          }
        }
        else {
          this.selectedPage = this.userGrp.filter(grp => grp._id == result)[0]
          this.preference = this.selectedPage.name;
        }
      }

      this.groupListdialogRef = null;
    });
  }

  newpromo(event: Event) {
    this.openNewPromoPostDialog();
    this.close(event);
    event.preventDefault();
  }

  openNewPromoPostDialog() {
    this.promoPostDialogRef = this.dialog.open(NewPromoPostComponent, {
      disableClose: false,
      panelClass: 'custom-overlay-pane-class_1',
      hasBackdrop: true
    });
    this.promoPostDialogRef.afterClosed().subscribe(result => {
      this.promoPostDialogRef = null;
    });
  }
  markDownBuilder(text: any) {
    return text.replace(/@.[a-z\d_]+.\S*/ig, this.regexReplacer);
  }
  regexReplacer = (str, p1, offset, s) => {
    var name = str.substring(1);
    return `
    <span style="color:#3F51B5; font-weight:600">[${name}](${this.apiBase}/profile/${this.mentionedUsers[name]})</span>
            `;
  }

  onSubmit(event: Event) {
    if (this.form.controls["text"].value || this.imagePreviewThumbnail.length > 0 || this.form.controls["selectedLocation"].value || this.form.controls["mentions"].value) {
      let formObject;
      let convertedString = this.markDownBuilder(this.form.controls["text"].value);
      console.log(convertedString);

      formObject = {
        'clientId': this.uuid,
        'text': this.markDownBuilder(this.form.controls["text"].value),
        'mentions': this.form.controls["mentions"].invalid ? null : [this.form.controls["mentions"].value],
        'geotag': this.form.controls["selectedLocation"].value ? this.form.controls["selectedLocation"].value : null
      }

      if (this.selectedPage) {
        formObject = Object.assign(formObject, { 'bizId': this.selectedPage._id });
      }
     //  this.store.dispatch(new postActions.PostAction(formObject));
      this.close(event);
      event.preventDefault();
    }
  }

  openCheckin(event: Event) {
    let dialogRef = this.dialog.open(CheckinComponent, {
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'custom-overlay-userloc-class'
    });
    dialogRef.afterClosed().subscribe(loc => {
      if (loc) {
        this.selectedLocation = loc;
        this.form.controls["selectedLocation"].setValue(this.selectedLocation);
      }
    });
    event.preventDefault();
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  mentionFormatter = (user) => {
    if (user) {
      let name = this.items.filter(u => u._id === user);
      this.form.controls['mentions'].setValue(user);

      // let userLink =  `<a [routerLink]="['/profile', ${user}]">${name[0].firstName}</a>`
      this.mentionedUsers[name[0].firstName + ' ' + name[0].lastName] = user;
      return '@' + name[0].firstName + ' ' + name[0].lastName;
    }
  }

  ngOnDestroy(){
    this.subscriptions.map((subs) => subs.unsubscribe());
  }
}

