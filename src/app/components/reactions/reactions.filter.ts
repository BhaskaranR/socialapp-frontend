import { Pipe, PipeTransform, Inject } from '@angular/core';
import { reactions } from './reactions.model';

@Pipe({name: 'react'})
export class ReactionsFilterPipe implements PipeTransform {
  transform(value: string) {
        return reactions.filter(r => r.key == value);
  }
}