import { StateManagerService } from './../../services/state-manager.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  data: Date = new Date();
  @ViewChild('divScroller') divElement: ElementRef;
  focus;
  focus1;
  farFromLeft = false;
  chips = [
    {
      title: 'Mathematics',
      tag: 'maths'
    },
    {
      title: 'English',
      tag: 'english'
    },
    {
      title: 'Music',
      tag: 'music'
    },
    {
      title: 'Engineering',
      tag: 'engineering'
    },
    {
      title: 'Calculus',
      tag: 'calculus'
    },
    {
      title: 'Physics',
      tag: 'physics'
    },
    {
      title: 'Mathematics Literacy',
      tag: 'mathsLit'
    },
    {
      title: 'Business Studies',
      tag: 'maths'
    },
    {
      title: 'Economics',
      tag: 'econ'
    }
  ];
  navbarHeight;
  constructor( private stateManagerService: StateManagerService) { }

  ngOnInit() {
    // const rellaxHeader = new Rellax('.rellax-header');

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  ngAfterViewInit() {
    this.navbarHeight = 73;
    if (this.divElement.nativeElement.scrollLeft === 0){
      this.farFromLeft = false;
    } else {
      this.farFromLeft = true;
    }
  }
  onRightButton() {
    console.log(this.divElement);
    const scrollValue = this.divElement.nativeElement.scrollLeft;
    console.log(this.divElement);
    this.divElement.nativeElement.scrollTo({ left: (scrollValue + 150), behavior: 'smooth' });
    
    if(scrollValue >= 0) {
      this.farFromLeft = true;
    } else{
      this.farFromLeft = false;
    }
  }
  onLeftButton() {
  
    const scrollValue = this.divElement.nativeElement.scrollLeft;
    console.log(this.divElement);
    this.divElement.nativeElement.scrollTo({ left: (scrollValue - 150), behavior: 'smooth' });
    
    if(scrollValue <= 150) {
      this.farFromLeft = false;
    } else{
      this.farFromLeft = true;
    }
  
  }
  
}
