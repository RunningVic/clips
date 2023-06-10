import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true;

  constructor(public clipService: ClipService) {
    this.clipService.getClips();
  }

  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll);
    } 
  }

  handleScroll = () => {
    // offsetHeight
    // innerHeight
    // scrollTop
    // if scrollTop + innerHeight == offsetHeight. load more clips
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const reachBottom = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (reachBottom) {
      this.clipService.getClips();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.clipService.pageClips = [];
  }
}
