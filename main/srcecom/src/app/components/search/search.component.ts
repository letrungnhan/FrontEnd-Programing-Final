import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string | null = "";


  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('searchTerm'))
        this.searchTerm = params.get('searchTerm');
    })
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  enterSearchValue: String = "";

  onSearchTextChanged() {

    // @ts-ignore
    this.searchTextChanged.emit(this.enterSearchValue);
  }

  onSubmit(form: NgForm): void {
    // @ts-ignore
    this.searchTerm = form.control.get('search')?.value;
    console.log(this.searchTerm)
    this.router.navigateByUrl('product-list/search/' + this.searchTerm);
  }


}
