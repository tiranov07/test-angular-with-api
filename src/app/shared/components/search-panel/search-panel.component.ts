import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  SearchValue: string = '';
  @Output() changedSearchValue: EventEmitter<string> = new EventEmitter<string>();
  faSearch = faSearch;
  faTimes = faTimes;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  search(SearchValue: string) {
    if (SearchValue.length == 0) {
      this.searchClear();
    } else {
      this.changedSearchValue.emit(SearchValue);
    }
  }

  searchClear() {
    this.SearchValue = undefined;
        this.changedSearchValue.emit(this.SearchValue);
  }

}
