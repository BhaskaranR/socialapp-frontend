import {Component, Input, Output, ViewChild, ElementRef, SimpleChanges,
	EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';
import { Comment } from '@app/typings/types';

@Component({
	selector: 'comment-list',
	templateUrl: 'comments-list.component.html',
	styleUrls:['./comments-list.component.css'],
})
export class CommentListComponent{
	@Input() comments: Comment[];
    @Input() isMore: boolean;
    @Output() loadMoreComments = new EventEmitter();
}