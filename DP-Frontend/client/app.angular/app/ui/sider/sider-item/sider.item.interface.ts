interface SiderItem {
  category:string,
  nav?: string,
  path?: string,
  status: number,
  title: string,
  items: SiderItem[]
}

export {SiderItem};
