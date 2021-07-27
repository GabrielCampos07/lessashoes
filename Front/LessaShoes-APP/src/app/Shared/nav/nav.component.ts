import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  larguraImagem: number = 80;
  alturaImagem: number = 80;
  bgBlack: string = 'background: black';

  isCollapsed: boolean = true;

  constructor(
    public authService: AutenticacaoService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  logado() {
    if (localStorage.getItem('token')) return true;
    else return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
}
