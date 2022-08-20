import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {CheckoutService} from "../../service/order-service/checkout.service";
import {CartService} from "../../service/cart.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  // @ts-ignore
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private checkoutService: CheckoutService,
              public cartService: CartService) {
  }

  ngOnInit():
    void {


    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        address: new FormControl('', [Validators.required, Validators.minLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        cardType: [''],
        cardName: [''],
        cardNumber: [''],
        securityCode: [''],
        expMonth: [''],
        expYear: [''],
        message: ['']

      })
    });


    const startMonth: number = new Date().getMonth() + 1;
    console.log(startMonth + "sm");

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Retrieced card month" + JSON.stringify(data));
      this.creditCardMonth = data;
    })

    this.checkoutService.getCreditCardYear().subscribe(data => {
      console.log("Retrieced card year" + JSON.stringify(data));
      this.creditCardYear = data;
    })

  }


  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("Handling the submit button");
    console.log("Handling the submit button");
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('customer');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expYear);


    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Revie credit cart month " + JSON.stringify(data));
      console.log(selectedYear);
      this.creditCardMonth = data;
    });
  }

}
