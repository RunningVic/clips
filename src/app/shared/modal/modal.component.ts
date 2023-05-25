import { Component, ElementRef, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent {
  @Input() modalId = '';

  constructor(public modal: ModalService, public elf: ElementRef) {
    
  }

  closeModal() {
    this.modal.toggleModal(this.modalId);
  }
}
