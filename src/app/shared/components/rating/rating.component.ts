import { Component, OnInit, Input } from '@angular/core';
import { faStar, faStarHalf, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() BookISBN: string;
  @Input() Editable: boolean = false;
  Rating: number = 0;
  MaxRating: number = 5;
  RatingArray: any[];
  faStar = faStar;
  farStar = farStar;
  faStarHalfAlt = faStarHalfAlt;
  constructor() { }

  ngOnInit(): void {
    this.loadRating();
    this.updateRatingArray(this.Rating);
  }

  updateRatingArray(RatingValue: number) {
    let RatingArray = [];
    for (let index = 0.5; index <= this.MaxRating; index += 0.5) {
      RatingArray.push({
        value: index,
        checked: (index <= RatingValue) ? true : false,
        withHalf: (index%1 == 0) ? false : true,
      });
    }
    this.RatingArray = RatingArray;
  }

  changeRating(NewRating: number) {
    if (!this.Editable) return
    console.log(`changeRaring() NewRating = ${NewRating}`);
    this.Rating = (NewRating == this.Rating) ? 0 : NewRating;
    this.updateRatingArray(this.Rating);
  }

  saveRating() {
    if (!this.Editable) return
    localStorage.setItem(`rating_${this.BookISBN}`, this.Rating.toString());
  }

  loadRating() {
    let LsRating: number = Number(localStorage.getItem(`rating_${this.BookISBN}`));
    if (LsRating) this.Rating = LsRating;
  }

}
