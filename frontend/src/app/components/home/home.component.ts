import {  NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit(): void {

  }
 products = ['../../../assets/images/cloth_1.jpg','../../../assets/images/cloth_2.jpg','../../../assets/images/cloth_3.jpg','../../../assets/images/shoe.png'];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  }
