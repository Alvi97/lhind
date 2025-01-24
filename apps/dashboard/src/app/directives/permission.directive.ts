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
    if (this.userService.currentUser && this.hasAnyPermission(this.requiredPermissions)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some((perm) => this.userService.currentUser?.permissions.includes(perm));
  }
}
