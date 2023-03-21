import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';

@Pipe({
  name: 'dueDatePipe' 
})

export class DueDatePipe implements PipeTransform {
    constructor() {}

    transform(args: number): string {
        return this.formatDate(args);
    }

    formatDate(numberOfDays: number): string {
        const time = _moment().add(numberOfDays, 'days').format("MM/DD/yyyy");
        return time;
    }
}