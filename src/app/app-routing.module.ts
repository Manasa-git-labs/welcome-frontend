import { AuthGuardService } from "./services/auth-guard.service";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { ActivateAccountComponent } from "./containers/user-authentication/activate-account/activate-account.component";
import { RegistrationComponent } from "./containers/user-authentication/registration/registration.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./containers/user-authentication/login/login.component";
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "verification/:token", component: ActivateAccountComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
