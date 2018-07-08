import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, Inject, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-usergroup-list',
    templateUrl: './usergroup-list.component.html',
    styleUrls: ['./usergroup-list.component.css']
})
export class UserGroupListComponent {
    constructor(
        public dialogRef: MatDialogRef<UserGroupListComponent>, 
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

}
