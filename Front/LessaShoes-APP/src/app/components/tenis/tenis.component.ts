import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";


import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: [
  './tenis.component.css',],
})
export class TenisComponent implements OnInit {

  ngOnInit() : void  {

  }
}

