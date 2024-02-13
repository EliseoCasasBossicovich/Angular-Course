import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iga-button-link',
  templateUrl: './iga-button-link.component.html',
  styleUrl: './iga-button-link.component.scss'
})
export class IgaButtonLinkComponent {
  @Input() buttonText?: string;
  @Input() routerLink?: string;

  constructor(private router: Router) { }

  redirectToRoute() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
