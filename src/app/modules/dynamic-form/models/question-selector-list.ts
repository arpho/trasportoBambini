import { QuestionBase } from '../models/question-base';
import { SelectorProperties } from '../../item/models/selectorItemsProperties';
import { ItemModule } from '../../item/item.module';
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { SelectorQuestion } from './question-selector';
// tslint:disable:semicolon


export class ListSelectorQuestion extends SelectorQuestion {
    controlType = 'itemListSelector';
    type: ItemModelInterface;
    constructor(options: SelectorProperties) {
        super(options);
    }
    selectedItem(item: ItemModelInterface) {
    }
}
