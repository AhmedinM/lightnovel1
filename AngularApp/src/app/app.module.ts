import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { NovelListsComponent } from './novel-lists/novel-lists.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllNovelsComponent } from './all-novels/all-novels.component';
import { NovelsComponent } from './novels/novels.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { LogoutComponent } from './logout/logout.component';
import { CommentComponent } from './comment/comment.component';
import { InsertCommentComponent } from './insert-comment/insert-comment.component';
import { InsertReviewComponent } from './insert-review/insert-review.component';
import { ReviewComponent } from './review/review.component';
import { RecommendComponent } from './recommend/recommend.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
//  Admin
import { AdminMainComponent } from './admin-main/admin-main.component';
import { MainComponent } from './main/main.component';
//  Rutiranje
import { MainRoutingModule } from './main/main.routing.component';
import { AdminMainRoutingModule } from './admin-main/admin-main.routing.component';
import { HeaderComponent } from './header/header.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminNovelListComponent } from './admin-novel-list/admin-novel-list.component';
import { AdminNovelEditComponent } from './admin-novel-edit/admin-novel-edit.component';
import { AdminChapterEditComponent } from './admin-chapter-edit/admin-chapter-edit.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminNovelInsertComponent } from './admin-novel-insert/admin-novel-insert.component';
import { AdminChapterInsertComponent } from './admin-chapter-insert/admin-chapter-insert.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NovelListsComponent,
    LoginComponent,
    RegisterComponent,
    AllNovelsComponent,
    NovelsComponent,
    ChaptersComponent,
    LogoutComponent,
    CommentComponent,
    InsertCommentComponent,
    InsertReviewComponent,
    ReviewComponent,
    RecommendComponent,
    ProfileComponent,
    ListComponent,
    ChapterListComponent,
    NotFoundComponent,
    AboutComponent,
    AdminMainComponent,
    MainComponent,
    HeaderComponent,
    AdminLoginComponent,
    AdminUserListComponent,
    AdminNovelListComponent,
    AdminNovelEditComponent,
    AdminChapterEditComponent,
    AdminPanelComponent,
    AdminNovelInsertComponent,
    AdminChapterInsertComponent,
    AdminGenreComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    MainRoutingModule,
    AdminMainRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
