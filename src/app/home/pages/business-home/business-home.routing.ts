import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessListPageComponent } from './businesslist-page.component';
import { BusinessMapComponent } from '@app/home/pages/business-core/components/business-map/business-map.component';


const businessRoutes: Routes = [
    {
        path: '',
        component: BusinessHomeComponent,
        children: [
            {
                path: '',
                component: BusinessMapComponent
            },
            {
                path: 'recommended',
                component: BusinessListPageComponent,
                data: { title: 'Recommended', type: 1 }
            },
            {
                path: 'member',
                component: BusinessListPageComponent,
                data: { title: 'Member', type: 2 }
            },
            {
                path: 'me',
                component: BusinessListPageComponent,
                data: { title: 'Yours', type: 3 }
            }
        ]
    }
];



export const routing: ModuleWithProviders = RouterModule.forChild(businessRoutes);
