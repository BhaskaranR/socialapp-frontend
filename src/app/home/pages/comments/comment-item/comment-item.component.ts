import {
    Component, Input, ChangeDetectionStrategy, Output, EventEmitter, NgZone,
    AfterViewInit
} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Inject } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Comment } from '@app/typings/types';

@Component({
    selector: 'comment-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements AfterViewInit {
    @Input() 
    item: Comment;

    fireAnimation: boolean;
    prepareAnimation: boolean;
    safeText: SafeHtml;
    timerSub: Subscription;
    timerSub2: Subscription;
    fade: string;

    constructor(private ds: DomSanitizer, 
                private _ngZone: NgZone,  
                @Inject('apiBase') private apiBase: string) {
    }

    ngAfterViewInit() {
    }

    get user() {
       return   {
           _id: this.item.user.id, 
           firstName: this.item.user.profile.firstName, 
           lastName: this.item.user.profile.lastName, 
           images: this.item.user.profile.images
        };
    }

 

    get name(): string {
        return `${this.item.user.profile.firstName} ${this.item.user.profile.lastName}` ;
    }

    get thumbnailImage(): string{
        return `${this.apiBase}/users/image/${this.item.user.profile.images.small}`;
    }

    ngOnDestroy() {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
        if (this.timerSub2) {
            this.timerSub2.unsubscribe();
        }
    }
    

    // var textarea = document.querySelector('textarea');
    
    // textarea.addEventListener('keydown', autosize);
                 
    // function autosize(){
    //   var el = this;
    //   setTimeout(function(){
    //     el.style.cssText = 'height:auto; padding:0';
    //     // for box-sizing other than "content-box" use:
    //     // el.style.cssText = '-moz-box-sizing:content-box';
    //     el.style.cssText = 'height:' + el.scrollHeight + 'px';
    //   },0);
    // }
}
