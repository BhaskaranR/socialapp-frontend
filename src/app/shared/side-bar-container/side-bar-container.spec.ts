import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SideBarContainer} from './side-bar-container';
import {TableOfContentsModule} from './side-bar-container.module';
import {DocsAppTestingModule} from '../../testing/testing-module';

const mockActivatedRoute = {
  fragment: Observable.create(observer => {
    observer.complete();
  })
};

describe('TableOfContents', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableOfContentsModule, DocsAppTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<SideBarContainer>;
  let component: SideBarContainer;

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have no header', () => {
    const header = fixture
      .nativeElement
      .querySelector('h2');
    expect(header).toBeNull();
  });

  it('should have header and links', () => {
    component.links = [
      {
        type: 'h2',
        id: 'test',
        name: 'test',
        top: 0,
        active: false
      }
    ];

    const header = fixture.nativeElement.querySelector('h2');
    expect(header).toBeDefined();

    const links = fixture.nativeElement.querySelector('li');
    expect(links).toBeDefined();
  });
});
