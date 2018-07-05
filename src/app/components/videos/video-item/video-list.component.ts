import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-item-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-grid.component.scss']
})
export class VideoListItemComponent implements OnInit {
@Input() isGalleryView : boolean;
@Input() video;
  constructor() { }

  ngOnInit() {
  }

}
