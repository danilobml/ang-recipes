import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isLoggedin = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((userData) => {
      if (userData) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveRecipesData() {
    this.dataStorageService.saveRecipesData().subscribe();
  }

  onFetchRecipesData() {
    this.dataStorageService.fetchRecipesData().subscribe();
  }
}
