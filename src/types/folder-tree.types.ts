export interface FolderNodeInterface {
  name: string;
  path: string;
  childFolders: FolderNodeInterface[];
}

export class FolderNode implements FolderNodeInterface {
  public constructor(
    public name: string,
    public path: string,
    public childFolders: FolderNodeInterface[]
  ) {}
}

export interface FolderTreeInterface extends Array<FolderNode> {}
