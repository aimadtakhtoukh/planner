import {Component, Input} from '@angular/core';
import {ColumnModel} from "../../../services/model/columnModel";

@Component({
    selector: 'case-container',
    templateUrl: './case-container.component.html',
    styleUrls: ['./case-container.component.scss']
})
export class CaseContainerComponent {

    @Input() model : ColumnModel;
    @Input() editable : boolean;

    constructor() { }

    onCaseClick() {
        if (this.editable) {
            this.model.deployed = true;
        }
    }
}
