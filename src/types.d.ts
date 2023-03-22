declare module "*.css" {
  const value: CSSStyleSheet;
  export default value;
}

declare module "*?worker" {
  const value: string;
  export default value;
}
