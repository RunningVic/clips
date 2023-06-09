import { Component, Input, OnDestroy, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();

  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  clipId = new FormControl('', {
    nonNullable: true
  });

  editForm = new FormGroup({
    title: this.title,
    id: this.clipId
  });

 


  constructor(
    private modal: ModalService,
    private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.clipId.setValue(this.activeClip.docId as string);
    this.title.setValue(this.activeClip.title);

    this.inSubmission = false;
    this.showAlert = false;
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';
    
    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value as string);
    } catch(e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later.';
      return;
    }
    this.update.emit(this.activeClip);
    this.activeClip.title = this.title.value as string;
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }
}
