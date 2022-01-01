import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import { NovelListsComponent } from './novel-lists/novel-lists.component';
import { AllNovelsComponent } from './all-novels/all-novels.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NovelsComponent } from './novels/novels.component';
import { LogoutComponent } from './logout/logout.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
//  Admin
import { AdminMainComponent } from './admin-main/admin-main.component';*/
import { AdminMainComponent } from './admin-main/admin-main.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  /*{path: "", component: NovelListsComponent},
  {path: "all", component: AllNovelsComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "register", component: RegisterComponent},
  {path: "novel/:id", component: NovelsComponent},
  {path: "novel/:id/:chapId", component: ChaptersComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "profile", component: ProfileComponent},
  {path: "about", component: AboutComponent},
  //  Admin
  {path: "admin", component: AdminMainComponent},
  {path: "**", redirectTo: "not-found"}*/
  //{path: "admin", component: AdminMainComponent},
  //{path: "", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
