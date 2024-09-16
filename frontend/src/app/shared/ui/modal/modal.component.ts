import { Component, model, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isHidden = model<boolean>(true);
  close(){
    this.isHidden.set(true);
    console.log(this.isHidden());

  }

  @HostListener('window:click', ['$event'])  
  onClick(event: KeyboardEvent) 
  {    
    if(!this.isHidden()){
    const targetElement = event.target as Element;
    if((targetElement.className !== "modal-content") 
      && (targetElement.parentElement?.className !== "modal-content")){
      this.isHidden.set(true);
      console.log(this.isHidden());
    }
  }  
  }
}
