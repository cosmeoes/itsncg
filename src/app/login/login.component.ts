import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { Location } from '@angular/common';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  noControl : string;
  pass : string;

  constructor(private portalService:PortalService, private location: Location) { }

  ngOnInit() {
    this.portalService.init();
  }


  login() {
    this.portalService.login(this.noControl, this.pass).subscribe(res => {
      if(res!="error") {
        window.location.href="/portal";
      }
    });
  }
}
