
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [],
    standalone: true
})
export class ButtonComponent {
    @Input() label: string = '';
    @Input() icon: string = '';
    @Input() isDisabled: boolean = false;
    @Output() buttonClick = new EventEmitter<void>();
  
    handleClick() {
      this.buttonClick.emit();
    }

}