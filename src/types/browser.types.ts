export interface BrowserNodeInterface {
  name: string;
  path: string;
  isFolder: boolean;
}

export class BrowserNode implements BrowserNodeInterface {
  public constructor(
    public name: string,
    public path: string,
    public isFolder: boolean
  ) {}
}

export interface BrowserNodesInterface extends Array<BrowserNode> {}
