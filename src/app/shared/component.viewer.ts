import { ElementRef, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SideBarContainer } from '@app/shared/side-bar-container/side-bar-container';

export class ComponentViewer implements OnInit {
    @ViewChild('intialFocusTarget') focusTarget: ElementRef;
    @ViewChild('toc') tableOfContents: SideBarContainer;
    showToc: Observable<boolean>;

    constructor(breakpointObserver: BreakpointObserver) {
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