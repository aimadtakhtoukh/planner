import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";

import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './services/repository/user.service';
import { EntryService } from './services/repository/entry.service';
import { CaseComponent } from './calendar/column/case-container/case/case.component';
import { ColumnComponent } from './calendar/column/column.component';
import { CaseContainerComponent } from './calendar/column/case-container/case-container.component';
import { DispoPickerComponent } from './calendar/column/case-container/dispo-picker/dispo-picker.component';
import { CurrentUserService} from './services/currentUser.service';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { TokenUpdateComponent } from './token-update/token-update.component';
import { TokenService } from "./services/auth/token.service";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { RedirectIfLoggedComponent } from './redirect-if-logged/redirect-if-logged.component';
import { TokenInterceptor } from "./services/auth/token.interceptor";

const appRoutes : Routes = [
    {path : "not-logged", component : NotLoggedComponent},
    {path : "token", component : TokenUpdateComponent},
    {path : "subscribe", component : SubscribeComponent},
    {path : "planner", component : CalendarComponent},
    {path : "**", component : RedirectIfLoggedComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        CaseComponent,
        NavbarComponent,
        DispoPickerComponent,
        ColumnComponent,
        CaseContainerComponent,
        NotLoggedComponent,
        TokenUpdateComponent,
        SubscribeComponent,
        RedirectIfLoggedComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot()
    ],
    providers: [
        UserService,
        EntryService,
        CurrentUserService,
        TokenService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
