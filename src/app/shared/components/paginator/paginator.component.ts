import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() CurrentPage: number = 1;
  Elements: number = 0;
  Pages: number[] = [];
  @Input() ElementsPerPage: number = 10;

  @Input() set CountElements(value) {
    this.Elements = value;
    this.CountPages = Math.ceil(this.Elements / this.ElementsPerPage);
    let Pages = [];
    for (let index = 1; index <= this.CountPages; index++) {
      Pages.push(index.toString());
    }
    this.Pages = Pages;
  };

  @Output() changePage: EventEmitter<number> = new EventEmitter();
  CountPages: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  setPage(item: number) {
    this.CurrentPage = item;
    this.changePage.emit(item);
  }

  setPreviousPage() {
    if (this.CurrentPage > 1) {
      this.CurrentPage--;
      this.changePage.emit(this.CurrentPage);
    }
  }

  setNextPage() {
    if (this.CurrentPage < this.CountPages) {
      this.CurrentPage++;
      this.changePage.emit(this.CurrentPage);
    }
  }

}
