import { Component, OnInit } from '@angular/core';
import { PermissionObject } from '../../models/permission-object';
import { ObjectType } from '../../enums/object-type';
import { PermissionObjectService } from '../../services/permission-object.service';
import { finalize } from 'rxjs';
import { globalPermissionObjectSchema } from 'src/permissions/permission-schema';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-permission-object-list',
  templateUrl: './permission-object-list.component.html',
  styleUrls: ['./permission-object-list.component.css']
})
export class PermissionObjectListComponent implements OnInit {

  listOfData: PermissionObject[] = [];
  public ObjectTypes = ObjectType;
  isLoading: boolean = false;

  constructor(private permissionObjectService: PermissionObjectService,
    private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.loadPermissionObjects(); 0.
  }

  syncObject() {
    this.isLoading = true;
    this.permissionObjectService.add(globalPermissionObjectSchema)
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(res => {
        if (res.isSuccess) {
          this.listOfData = res.data;
          this.messageService.create('success', 'Synchronize permission object successfully!')
        }
      })
  }

  loadPermissionObjects() {
    this.isLoading = true;
    this.permissionObjectService.getAll([ObjectType.All, ObjectType.Page, ObjectType.Button]).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.listOfData = res.data;
        console.log(this.listOfData);

      }
    })
  }

  collapse(parentId: number, $event: boolean): void {
    this.listOfData
      .forEach(x => {
        if (x.parentPermissionObjId == parentId) {
          x.expand = $event;
        }
      })
  }

}
