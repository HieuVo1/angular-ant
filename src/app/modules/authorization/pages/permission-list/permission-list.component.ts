import { Component } from '@angular/core';
import { Permission } from '../../models/permission';
import { RoleService } from '../../services/role.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { PermissionUpdate } from '../../models/permission-update';
import { ObjectType } from '../../enums/object-type';

interface ParentItemData {
  key: number;
  name: string;
  type: ObjectType;
  description: string;
  expand: boolean;
  viewPermission: boolean;
  parentKey?: number;
}

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent {
  listOfData: Permission[] = [];
  public ObjectTypes = ObjectType;
  isLoading: boolean = false;
  roleForm!: FormGroup;
  roleId!: number;

  selectedData!: Permission;
  isShowModal: boolean = false;
  modalTitle!: string;
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.roleForm = this.formBuilder.group({
      name: new FormControl({ value: null, disabled: true }, Validators.required),
      description: new FormControl({ value: null, disabled: true }, Validators.required),
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['roleId']) {
        this.roleId = params['roleId']
        this.loadRoleById(this.roleId);
      }
    });
  }

  collapse(parentId: number, $event: boolean): void {
    this.listOfData
      .forEach(x => {
        if (x.parentPermissionObjId == parentId) {
          x.expand = $event;
        }
      })
  }

  loadRoleById(roleId: number) {
    this.isLoading = true;
    this.roleService.getById(roleId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {

        if (res.isSuccess) {
          const role = res.data;
          this.listOfData = res.data.permissions;
          this.roleForm.controls['name'].setValue(role.name);
          this.roleForm.controls['description'].setValue(role.description);
        }
        else {
          this.messageService.create('error', res.errorMessage);
        }
      })
  }

  refreshStatus(permissionObjectId: number, value: boolean): void {
    this.isLoading = true;
    const permission: PermissionUpdate = {
      roleId: this.roleId,
      permissionObjectId: permissionObjectId,
      viewPermission: value
    }

    this.permissionService.update(permission)
      .pipe(
        finalize(() => (this.isLoading = false))
      ).subscribe((res) => {
        if (!res.isSuccess) {
          this.messageService.create('error', res.errorMessage);
        }

      });

    this.listOfData.forEach(data => {
      if (data.parentPermissionObjId == permissionObjectId) {
        data.viewPermission = value;
      }
    });
  }

  delete(permissionObjectId: number) {
    this.isLoading = true;
    this.permissionService.delete(this.roleId, permissionObjectId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.listOfData = this.listOfData.filter(val => !(val.roleId == this.roleId &&
          (val.permissionObjectId == permissionObjectId || val.parentPermissionObjId == permissionObjectId)));
      }
    });
  }

  showModal() {
    this.modalTitle = 'ADD PERMISSION';
    this.isShowModal = true;
    this.isEditMode = false;
  }

  editPermission(data: Permission) {
    this.modalTitle = 'EDIT PERMISSION';
    this.selectedData = { ...data };
    this.isShowModal = true;
    this.isEditMode = true;
  }

  closeModal() {
    this.isShowModal = false;
    this.isEditMode = false;
  }

  insertRoleSuccess(data: Permission[]) {
    this.listOfData = this.listOfData = [
      ...this.listOfData,
      ...data
    ];
    this.isShowModal = false;
  }
}
