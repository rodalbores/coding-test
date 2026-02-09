import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'th[appTh]',
  standalone: true,
  host: {
    class: 'py-2 pr-3 text-xs font-medium text-slate-500',
  },
})
export class ThDirective {}

@Directive({
  selector: 'td[appTd]',
  standalone: true,
  host: {
    class: 'py-2 pr-3 text-slate-700',
  },
})
export class TdDirective {}

@Directive({
  selector: 'tr[appTr]',
  standalone: true,
  host: {
    class: 'hover:bg-slate-50',
    '[class.cursor-pointer]': 'clickable',
  },
})
export class TrDirective {
  @Input() clickable = false;
}
