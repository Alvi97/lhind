import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '@lhind/data-access-user';
import { Permission } from '../models/user.model';

@Directive({
  selector: '[lhindPermission]',
  standalone:true
})
export class PermissionDirective {
  private requiredPermissions: Permission[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService:UserService
  ) {}

  @Input() set lhindPermission(permissions: Permission | Permission[]) {
    this.requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
    this.updateView();
  }

  private updateView(): void {
    if (this.userService.currentUser && this.hasAllPermissions(this.requiredPermissions)) {
      // If the user has all required permissions, display the element
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Otherwise, clear the view
      this.viewContainer.clear();
    }
  }

  private hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every((perm) => this.userService.currentUser?.permissions.includes(perm));
  }
}
