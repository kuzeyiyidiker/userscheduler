import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-info-modal',
  templateUrl: './event-info-modal.component.html',
  styleUrls: ['./event-info-modal.component.scss']
})
export class EventInfoModalComponent implements OnInit {

  @Input() 
  userEvent;
  
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
