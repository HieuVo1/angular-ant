import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit } from '@angular/core';
import { Permission } from '../../models/permission';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '../../services/permission.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { PermissionObject } from '../../models/permission-object';
import { PermissionObjectService } from '../../services/permission-object.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectType } from '../../enums/object-type';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.css']
})
export class PermissionModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() cancelEvent = new EventEmitter<string>();
  @Output() insertSuccessEvent = new EventEmitter<Permission[]>();

  baseForm!: FormGroup;
  isLoadingButton = false;
  permissionObjects: PermissionObject[] = [];
  isLoadPermissionObj = false;
  roleId!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly permissionService: PermissionService,
    private readonly permissionObjectService: PermissionObjectService,
    private readonly messageService: NzMessageService) {
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      permissionObjectId: new FormControl({ value: null, disabled: false }, Validators.required),
    });
  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params['roleId']) {
        this.roleId = params['roleId'];
      }
    });

    this.loadPermissionSelect(ObjectType.All);
  }

  cancelModal(): void {
    this.cancelEvent.emit();
    this.baseForm.reset();
  }

  submitForm() {
    this.isLoadingButton = true;
    const roleFormData = this.baseForm.value as Permission;
    roleFormData.roleId = this.roleId;
    this.addPermission(roleFormData);
  }

  addPermission(permission: Permission) {
    this.permissionService.add(permission)
      .pipe(
        finalize(() => (this.isLoadingButton = false))
      ).subscribe((res) => {
        if (res.isSuccess) {
          this.messageService.create('success', `Create permission successfully!`);
          this.insertSuccessEvent.emit(res.data);
          this.baseForm.reset();
        }
        else {
          this.messageService.create('error', res.errorMessage);
        }
      });
  }

  loadPermissionSelect(type: ObjectType) {
    if (this.permissionObjects.length > 0) return;
    this.isLoadPermissionObj = true;
    this.permissionObjectService.getAll([ObjectType.All, ObjectType.Page]).pipe(
      finalize(() => this.isLoadPermissionObj = false)
    )
      .subscribe(res => {
        if (res.isSuccess) {
          this.permissionObjects = res.data;
        }
      })
  }
}
