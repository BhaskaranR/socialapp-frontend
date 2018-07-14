import { Component, NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Loona } from '@loona/angular';
import { Observable, Subject } from 'rxjs';
import { User } from '@app/typings/types';
import { getMe } from '@app/graphql/queries/users/me.query';
import { pluck, share, tap, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html'
})
export class ProfileCardComponent {

	private unsubscribe$: Subject<void> = new Subject<void>();
	me$: Observable<User>;
	loading$: Observable<boolean>;

	private currentUser: any;

	constructor(private loona: Loona) {}

	ngOnInit() {
		  const me$ = this.loona
		  .query({
			query: getMe,
			fetchPolicy: 'cache-and-network',
		  })
		  .valueChanges.pipe(
			takeUntil(this.unsubscribe$),
			share());
	
		this.me$ = me$.pipe(pluck('data', 'me'));
		this.loading$ = me$.pipe(pluck('loading'));
	}
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	  }
}

@NgModule({
	imports:[
		CommonModule,
		MatCardModule,
		FlexLayoutModule,
		AvatarModule],
    declarations: [
        ProfileCardComponent],
        exports: [ProfileCardComponent]
})
export class ProfileCardModule { }
