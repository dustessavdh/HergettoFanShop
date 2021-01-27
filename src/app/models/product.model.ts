export class Product {
  // tslint:disable-next-line: max-line-length
  constructor(private productId: number, private title: string, private description: string, private price: number, private imageUrl: string, private sizes: string[], private colors: string[], public id: string = '') {}

  public getProductId(): number {
    return this.productId;
  }

  public setProductId(value: number) {
    this.productId = value;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(value: string) {
    this.title = value;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(value: number) {
    this.price = value;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public setImageUrl(value: string) {
    this.imageUrl = value;
  }

  public getSizes(): string[] {
    return [...this.sizes];
  }

  public setSizes(value: string[]) {
    this.sizes = value;
  }

  public addSize(size: string) {
    this.sizes.push(size);
  }

  public getColors(): string[] {
    return [...this.colors];
  }

  public setColors(value: string[]) {
    this.colors = value;
  }

  public addColor(color: string) {
    this.colors.push(color);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }
}
