import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loading = true;
  constructor() { }

  ngOnInit(): void {
  }
  imageLoaded() {
    this.loading = false;
  }

}