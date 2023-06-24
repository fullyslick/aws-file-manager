export interface ObjectDataInterface {
  name: string;
  location: string;
}

export class ObjectData implements ObjectDataInterface {
  public constructor(public name: string, public location: string) {}
}

export interface FolderViewInterface {
  folders: ObjectDataInterface[];
  files: ObjectDataInterface[];
}

export class FolderView implements FolderViewInterface {
  public constructor(
    public folders: ObjectDataInterface[],
    public files: ObjectDataInterface[]
  ) {}
}
