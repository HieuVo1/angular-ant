import { ObjectType } from "../app/modules/authorization/enums/object-type";
import { PermissionObjectCreate } from "../app/modules/authorization/models/permission-object-create";

export const Pages = {
  All: 'All',
  Distributor: 'Distributor',
  Item: 'Item'
}

export const Buttons = {
  Read: 'Read',
  Insert: 'Insert',
  Modify: 'Modify',
  Delete: 'Delete',
  Custom: 'Custom',
  Import: 'Import',
  Export: 'Export'
}

export const globalPermissionObjectSchema: PermissionObjectCreate[] = [
  {
    type: ObjectType.All,
    name: Pages.All,
    description: 'All Object',
  },
  {
    type: ObjectType.Page,
    name: Pages.Distributor,
    description: 'Distributor Page',
    childObjects: [
      {
        type: ObjectType.Button,
        name: Buttons.Insert,
        description: 'Insert Button',
      },
      {
        type: ObjectType.Button,
        name: Buttons.Modify,
        description: 'Modify Button',
      },
      {
        type: ObjectType.Button,
        name: Buttons.Delete,
        description: 'Delete Button',
      },
      {
        type: ObjectType.Button,
        name: Buttons.Import,
        description: 'Import Button',
      },
    ]
  },
  {
    type: ObjectType.Page,
    name: Pages.Item,
    description: 'Item Page',
    childObjects: [
      {
        type: ObjectType.Button,
        name: Buttons.Insert,
        description: 'Insert Button',
      },
      {
        type: ObjectType.Button,
        name: Buttons.Modify,
        description: 'Modify Button',
      },
      {
        type: ObjectType.Button,
        name: Buttons.Delete,
        description: 'Delete Button',
      },
    ]
  },
]
