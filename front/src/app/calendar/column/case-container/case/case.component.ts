import {Component, Input} from '@angular/core';

@Component({
    selector: 'case',
    templateUrl: './case.component.html',
    styleUrls: ['./case.component.scss']
})

export class CaseComponent {
    @Input() state : string;
}