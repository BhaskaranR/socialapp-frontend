import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent  implements OnInit {
  @Input()
  people: any[];

  @Input()
  viewType: number;

  @Input()
  preview: boolean;

  @Input()
  showAction: boolean = true;

  @Output()
  peopleFollowAction =new EventEmitter<{id: string, action: string}>();

  cardAction($event: {id: string, action: string}) {
    this.peopleFollowAction.emit($event);
  }

  ngOnInit(){
    console.log(this.people , ' ppl');
  }
}
