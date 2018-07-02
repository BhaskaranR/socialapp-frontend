import { ElementRef, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TableOfContents } from '@app/shared/table-of-contents/table-of-contents';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { PostsHome } from './posts-home';


export class ComponentOverview implements OnInit {
    @ViewChild('intialFocusTarget') focusTarget: ElementRef;
    @ViewChild('toc') tableOfContents: TableOfContents;
    showToc: Observable<boolean>;

    constructor(public componentViewer: PostsHome, breakpointObserver: BreakpointObserver) {
        this.showToc = breakpointObserver.observe('(max-width: 1200px)')
            .pipe(map(result => !result.matches));
    }

    ngOnInit() {
        // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
        if (!this.focusTarget) { return; }
        setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
    }

    onContentLoaded() {
        if (this.tableOfContents) {
            this.tableOfContents.updateScrollPosition();
        }
    }
}