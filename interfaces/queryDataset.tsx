interface IField {
  name: string
  type: null | string
}

interface IDataset {
  id: number
  name: string
}

interface IQueryDataset {
  fields: IField[]
  dataset: IDataset | null
}

interface IFieldResponse {
  id: number
  name: string
}
