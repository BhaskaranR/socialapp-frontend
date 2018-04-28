import {TestBed, inject, async} from '@angular/core/testing';
import {MenuItems} from './menu-items';

const COMPONENTS = 'components';

describe('MenuViewer', () => {
  let menuItems: MenuItems;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MenuItems]
    }).compileComponents();
  }));

  beforeEach(inject([MenuItems], (di: MenuItems) => {
    menuItems = di;
  }));

  it('get a list of categories', () => {
    expect(menuItems.getCategories(COMPONENTS)).toBeDefined();
    expect(menuItems.getCategories(COMPONENTS).length).toBeGreaterThan(0);
    for (const category of menuItems.getCategories(COMPONENTS)) {
      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      expect(category.items).toBeDefined();
      expect(category.items.length).toBeGreaterThan(0);
    }
  });

  it('should get a list of all menu items', () => {
    expect(menuItems.getItems(COMPONENTS)).toBeDefined();
    expect(menuItems.getItems(COMPONENTS).length).toBeGreaterThan(0);
    for (const item of menuItems.getItems(COMPONENTS)) {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
    }
  });

});
