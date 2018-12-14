import { Component, OnInit, Input } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ModuleComponent } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-polyphonic-osc',
  templateUrl: './polyphonic-osc.component.html',
  styleUrls: ['./polyphonic-osc.component.scss']
})
/**
 * Represents a polyphonic oscilattor component.
 * NB for now it's only monophonic.
 */
export class PolyphonicOscComponent implements OnInit, ModuleComponent {
  @Input() data: any;
  private osc: OscillatorNode;


  constructor(public contextManager: AudioContextManagerService) { }

  ngOnInit() {
    this.osc = this.contextManager.audioContext.createOscillator();
    this.osc.type = 'square';
    this.osc.start();
  }

}
