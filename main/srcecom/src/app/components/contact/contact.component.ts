import { Component, OnInit } from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor() { }


  ngOnInit(): void {

  }

}
