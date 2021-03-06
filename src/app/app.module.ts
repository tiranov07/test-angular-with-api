import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from "./services/http.service";
import { HttpInterceptor } from "@angular/common/http"
import { CacheInterceptor } from "./services/cache.interceptor";
import { RequestCacheService } from "./services/requestCache.service";
import { BooksService } from "./services/books.service";
import { BookListComponent } from './book-list/book-list.component';
import { BookViewComponent } from './book-view/book-view.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { RatingComponent } from './shared/components/rating/rating.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SearchPanelComponent } from './shared/components/search-panel/search-panel.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';

const appRoutes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'view/:isbn', component: BookViewComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookViewComponent,
    CommentComponent,
    RatingComponent,
    SearchPanelComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FontAwesomeModule
  ],
  providers: [HttpService, BooksService, RequestCacheService, {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
