const DATASET_MOCK: IDataset[] = [
  {
    id: 1,
    name: 'Dataset A',
  },
  {
    id: 2,
    name: 'Dataset B',
  },
  {
    id: 3,
    name: 'Dataset C',
  },
  {
    id: 4,
    name: 'Dataset D',
  },
]

const LIST_FIELD_MOCK: IFieldResponse[] = [
  {
    id: 1,
    name: 'Field 1',
  },
  {
    id: 2,
    name: 'Field 2',
  },
  {
    id: 3,
    name: 'Field 3',
  },
  {
    id: 4,
    name: 'Field 4',
  },
  {
    id: 5,
    name: 'Field 5',
  },
]

export const datasetAPI = {
  getListDataset: () => {
    return new Promise<IDataset[]>((resolve) => {
      setTimeout(() => {
        resolve(DATASET_MOCK)
      }, 500)
    })
  },
  getListField: (dataset: string) => {
    return new Promise<IFieldResponse[]>((resolve) => {
      setTimeout(() => {
        resolve(LIST_FIELD_MOCK)
      }, 500)
    })
  },
}
