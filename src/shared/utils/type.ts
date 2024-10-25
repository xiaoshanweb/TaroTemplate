export interface ChooseItem {
  BrandId: number | string,
  BrandName: string,
  isChoose?: boolean,
  SearchKey?: string,
  Logo?: string
}

export interface ChooseList {
  list: Array<ChooseItem>,
  total: number
}

export interface ParamsDrawer {
  minPrice: '',
  maxPrice: '',
  brandList: Array<ChooseItem>,
  channelList: Array<ChooseItem>
}
