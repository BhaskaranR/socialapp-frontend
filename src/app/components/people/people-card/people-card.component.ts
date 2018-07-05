import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls : ['./people-card.component.css']
})
export class PeopleCardComponent implements OnInit {

  @Input()
  user: any;

  @Input() canOpenProfile: boolean = true;

  @Input() imageSize: number = 70;

  @Input() preview: boolean;

  @Input() showAction: boolean = true;

  @Output() cardAction = new EventEmitter();

  @Input()
  actionType = 'Follow';

  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1}`);
  selectedAvatar = this.avatars[2];

  constructor( @Inject('apiBase') private apiBase: string) { }

  get avatarDataCircle() {
    return {
      size: this.imageSize,
      fontColor: '#FFFFFF',
      border: '2px solid #d3d3d3',
      isSquare: false,
      text: this.name
    };
  }


  get name() {
    if (!this.user.profile) return ;

    if (this.user.profile.firstName && this.user.profile.lastName) {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`;
    } else if (!this.user.profile.firstName && this.user.profile.lastName) {
      return ` ${this.user.profile.lastName}`;
    } else {
      return ` ${this.user.profile.firstName}`;
    }
  }

  get thumbnail(): string | boolean {
    if (this.user.images && this.user.images.small && this.user.images.small !== '') {
      return `${this.user.images.small}`;
    }
    return false;
  }

  action($event) {
    this.cardAction.emit({id: this.user._id, action: this.actionType});
    $event.stopPropogation();
  }

  ngOnInit(){
    console.log("user : ", this.user);
  }
}
