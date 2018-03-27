import { Component, OnInit } from '@angular/core';
import { routerTransition } from '@app/core';

@Component({
  selector: 'ksoc-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  animations: [routerTransition]
})
export class TrendingComponent implements OnInit {
  topics = [
    { link: 'feeds', label: 'Trending' },
    { link: 'photos', label: 'Photos' },
    { link: 'videos', label: 'Videos' }
  ];

  constructor() {}

  ngOnInit() {}
}
