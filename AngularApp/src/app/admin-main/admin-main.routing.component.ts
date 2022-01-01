import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './admin-main.component';
import { LogoutComponent } from '../logout/logout.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminUserListComponent } from '../admin-user-list/admin-user-list.component';
import { AdminNovelListComponent } from '../admin-novel-list/admin-novel-list.component';
import { AdminNovelEditComponent } from '../admin-novel-edit/admin-novel-edit.component';
import { AdminChapterEditComponent } from '../admin-chapter-edit/admin-chapter-edit.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminNovelInsertComponent } from '../admin-novel-insert/admin-novel-insert.component';
import { AdminChapterInsertComponent } from '../admin-chapter-insert/admin-chapter-insert.component';
import { AdminGenreComponent } from '../admin-genre/admin-genre.component';

const routes: Routes = [{
    path: "admin",
    component: AdminMainComponent,
    children: [
        {path: "", component: AdminPanelComponent},
        {path: "logout", component: LogoutComponent},
        {path: "users", component: AdminUserListComponent},
        {path: "novels", component: AdminNovelListComponent},
        {path: "novel/:id", component: AdminNovelEditComponent},
        {path: "novel/:id/:chapId", component: AdminChapterEditComponent},
        {path: "novels/insert", component: AdminNovelInsertComponent},
        {path: "novel/:id/insert", component: AdminChapterInsertComponent},
        {path: "genres", component: AdminGenreComponent},
        {path: "not-found", component: NotFoundComponent},
        {path: "**", redirectTo: "not-found"}
    ]},
    {path: "admin-login", component: AdminLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminMainRoutingModule { }
