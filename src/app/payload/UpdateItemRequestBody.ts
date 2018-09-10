export class UpdateItemRequestBody {
  parentId: number;
  value: number;

  constructor(value: number, parentId: number) {
    this.parentId = parentId;
    this.value = value;
  }
}
