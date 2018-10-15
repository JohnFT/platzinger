import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(value, args: string) {
        if (!value) {
            return;
        }
        if (!args) {
            return value;
        }
        args = args.toString().toLowerCase();
        return value.filter((item) => {
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}
