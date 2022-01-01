import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovelListsComponent } from '../novel-lists/novel-lists.component';
import { AllNovelsComponent } from '../all-novels/all-novels.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NovelsComponent } from '../novels/novels.component';
import { LogoutComponent } from '../logout/logout.component';
import { ChaptersComponent } from '../chapters/chapters.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { AboutComponent } from '../about/about.component';
import { SearchComponent } from '../search/search.component';
import { MainComponent } from './main.component';
//import { AdminMainComponent } from '../admin-main/admin-main.component';

const routes: Routes = [{
    path: "",
    component: MainComponent,
    children: [
        {path: "", component: NovelListsComponent},
        {path: "all", component: AllNovelsComponent},
        {path: "login", component: LoginComponent},
        {path: "logout", component: LogoutComponent},
        {path: "register", component: RegisterComponent},
        {path: "novel/:id", component: NovelsComponent},
        {path: "novel/:id/:chapId", component: ChaptersComponent},
        {path: "not-found", component: NotFoundComponent},
        {path: "profile", component: ProfileComponent},
        {path: "about", component: AboutComponent},
        {path: "search", component: SearchComponent},
    ]},
    //{path: "**", redirectTo: "not-found"}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
