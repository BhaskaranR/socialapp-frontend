import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SideBarContainer } from '@app/shared/side-bar-container/side-bar-container';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feature-posts',
  templateUrl: './feature-posts.component.html',
  styleUrls: ['./feature-posts.component.scss']
})
export class FeaturePostsComponent implements OnInit {
  
  @ViewChild('intialFocusTarget') focusTarget: ElementRef;
  @ViewChild('sbc') sideBarContainer: SideBarContainer;
  showToc: Observable<boolean>;

  constructor( breakpointObserver: BreakpointObserver) {
    this.showToc = breakpointObserver.observe('(max-width: 1200px)')
      .pipe(map(result => !result.matches));
  }

  ngOnInit() {
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
  }

  onContentLoaded() {
    if (this.sideBarContainer) {
      this.sideBarContainer.updateScrollPosition();
    }
  }
}

