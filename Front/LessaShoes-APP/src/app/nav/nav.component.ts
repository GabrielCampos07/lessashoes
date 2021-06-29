import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  larguraImagem : number = 80
  alturaImagem : number = 80
  bgBlack: string = "background: black"

  constructor() { }

  ngOnInit() {
  }

}
