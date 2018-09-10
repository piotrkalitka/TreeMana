export class Item {

  id: number;
  parentId: number;
  value: number;
  sum: number;
  level: number;
  children: Item[];

  constructor(id: number, parentId: number, value: number, sum: number, level: number, children: Item[]) {
    this.id = id;
    this.parentId = parentId;
    this.value = value;
    this.sum = sum;
    this.level = level;
    this.children = children;
  }

}
