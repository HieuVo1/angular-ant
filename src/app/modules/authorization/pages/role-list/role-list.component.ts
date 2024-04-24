import { Component } from '@angular/core';
import { BaseParam } from 'src/app/core/models/base-param';
import { Role } from 'src/app/modules/authorization/models/role';
import { RoleService } from '../../services/role.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {
  listData: Role[] = [];
  isLoading: boolean = false;
  total: number = 0;
  searchValue = '';
  visible: boolean = false;
  baseParam: BaseParam = new BaseParam();

  selectedData!: Role;
  isShowModal: boolean = false;
  modalTitle!: string;
  isEditMode: boolean = false;
  constructor(private roleService: RoleService, private router: Router) {

  }
  onQueryParamsChange = (params: NzTableQueryParams) => {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);

    this.baseParam.pageIndex = pageIndex;
    this.baseParam.pageSize = pageSize;
    this.baseParam.sortField = (currentSort && currentSort.key) || undefined;
    this.baseParam.sortOrder = (currentSort && currentSort.value) || undefined;
    this.baseParam.filters = filter.filter(f => f.value.length > 0);


    if (this.searchValue !== '') {
      this.baseParam.filters.push({ key: "description", value: this.searchValue });
    }

    this.loadDataFromServer(this.baseParam);
  }

  loadDataFromServer(baseParam: BaseParam): void {
    this.isLoading = true;
    this.roleService.getAll().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      console.log(response);

      this.listData = response.data;
      this.total = response.data.length;
    });
  }

  search() {

  }
  reset() {

  }

  viewPermissions(roleId: number) {
    this.router.navigate(['/admin/authorization/permission', roleId]);
  }


  showModal() {
    this.modalTitle = 'ADD ROLE';
    this.isShowModal = true;
    this.isEditMode = false;
  }

  editRole(data: Role) {
    this.modalTitle = 'EDIT ROLE';
    this.selectedData = { ...data };
    this.isShowModal = true;
    this.isEditMode = true;
  }

  closeModal() {
    this.isShowModal = false;
    this.isEditMode
  }

  insertRoleSuccess(data: Role) {
    this.listData = this.listData = [
      ...this.listData,
      data
    ];
    this.total++;
    this.isShowModal = false;
  }

  updateRoleSuccess(data: Role) {
    const index = this.listData.findIndex(r => r.roleId === data.roleId);
    Object.assign(this.listData[index], data);
    this.isShowModal = false;
  }

  deleteRole(roleId: number) {
    this.isLoading = true;
    this.roleService.delete(roleId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.total--;
        this.listData = this.listData.filter(val => val.roleId !== roleId);
      }
    });
  }
}
