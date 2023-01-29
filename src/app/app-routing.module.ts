import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '', // child route path
        component: WelcomeComponent, // child route component that the router renders
      },
      {
        path: 'profile', // child route path
        component: ProfileComponent, // child route component that the router renders
      },
      {
        path: 'categories', // child route path
        component: ViewCategoriesComponent, // child route component that the router renders
      },
      {
        path: 'add-category', // child route path
        component: AddCategoriesComponent, // child route component that the router renders
      },
      {
        path: 'quizzes', // child route path
        component: ViewQuizzesComponent, // child route component that the router renders
      },
      {
        path: 'add-quiz', // child route path
        component: AddQuizComponent, // child route component that the router renders
      },
      {
        path: 'quiz/:qid', // child route path
        component: UpdateQuizComponent, // child route component that the router renders
      },
      {
        path: 'view-question/:id/:title', // child route path
        component: ViewQuizQuestionsComponent, // child route component that the router renders
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'question/:quesId', // child route path
        component: UpdateQuestionComponent, // child route component that the router renders
      },

    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: ':catId', // child route path
        component: LoadQuizComponent, // child route component that the router renders
      },
      {
        path: 'instructions/:qId', // child route path
        component: InstructionsComponent, // child route component that the router renders
      },
      
    ]
  },
  {
    path: 'start/:qid', // child route path
    component: StartComponent, // child route component that the router renders
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
