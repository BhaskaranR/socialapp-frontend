import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Business } from '@app/typings/types';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent {

  @Input()
  business: Business[];

  @Input()
  viewType: number;

  @Input()
  showAddNew: boolean = false;

  @Output()
  businessFollowAction = new EventEmitter<{ id: string, action: string }>();

  @Output()
  newBusinessAction = new EventEmitter();

  cardAction($event: { id: string, action: string }) {
    this.businessFollowAction.emit($event);
  }

  newBusiness(event: Event) {
    this.newBusinessAction.emit(event);
  }
}