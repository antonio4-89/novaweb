import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterComponent } from './router/router.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RouterComponent,
    ProductListComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'novacoders-b3936',
    //     appId: '1:456963770694:web:8068982be09245cd803d47',
    //     storageBucket: 'novacoders-b3936.firebasestorage.app',
    //     apiKey: 'AIzaSyDFk5NE2wkJ1FyU3MsMJ-9nSYN-10liRTU',
    //     authDomain: 'novacoders-b3936.firebaseapp.com',
    //     messagingSenderId: '456963770694',
    //   })
    // ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
