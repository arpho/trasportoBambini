import {
  Component, Input, TemplateRef,
} from "@angular/core";
@Component({
  selector: 'app-template',
  template: `
  
<ng-template #defaultTabButtons>
  
  <div class="default-tab-buttons">
      <ion-button (click)="hello()">default button</ion-button>
  </div>
  
</ng-template>
<ng-container 
*ngTemplateOutlet="headerTemplate ? headerTemplate: defaultTabButtons">
  
</ng-container>
... rest of tab container component ...
`})
export class TestTemplate {
  @Input()
  headerTemplate: TemplateRef<any>;

  hello(){
    console.log("ciao")
  }
}