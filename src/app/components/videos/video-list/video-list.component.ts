import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() videos: any = [];
  @Input() isGalleryView : boolean;
  constructor() { }

  ngOnInit() {
  }

}
