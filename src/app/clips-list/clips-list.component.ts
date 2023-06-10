import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css']
})
export class ClipsListComponent implements OnInit, OnDestroy {

  constructor(public clipService: ClipService) {
    this.clipService.getClips();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll);
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
    window.removeEventListener('scroll', this.handleScroll);
  }
}
