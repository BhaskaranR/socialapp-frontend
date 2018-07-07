import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SideBarContainer } from '@app/shared/side-bar-container/side-bar-container';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { NewPostComponent } from '../new-post/newpost/newpost';

@Component({
  selector: 'app-feature-posts',
  templateUrl: './feature-posts.component.html',
  styleUrls: ['./feature-posts.component.scss']
})
export class FeaturePostsComponent implements OnInit {
  
  dialogRef: MatDialogRef<NewPostComponent>;
  @ViewChild('intialFocusTarget') focusTarget: ElementRef;
  @ViewChild('sbc') sideBarContainer: SideBarContainer;
  showToc: Observable<boolean>;

  constructor( breakpointObserver: BreakpointObserver,
  
    protected dialog: MatDialog) {
    this.showToc = breakpointObserver.observe('(max-width: 1200px)')
      .pipe(map(result => !result.matches));
  }

  ngOnInit() {
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
  }


  openNewPostDialog() {
    this.dialogRef = this.dialog.open(NewPostComponent, {
      disableClose: false,
      panelClass: 'custom-overlay-pane-class',
      hasBackdrop: true
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  onContentLoaded() {
    if (this.sideBarContainer) {
      this.sideBarContainer.updateScrollPosition();
    }
  }
}

