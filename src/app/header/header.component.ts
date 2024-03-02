import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: string | null = null;

  openDropdown(dropdown: string): void {
    this.isDropdownOpen = dropdown;
    console.log("dropdown");
  }
}
