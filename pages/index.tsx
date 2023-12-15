import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import { datasetAPI } from '../services/dataset.service'
import QueryDatasetItem from '../containers/QueryDataset/QueryDatasetItem'
import IconSVG from '../components/Icon/IconSVG'

export default function Home() {
  const [datasetOptions, setDatasetOptions] = useState<IDataset[]>([])
  const [data, setData] = useState<IQueryDataset[]>([])
  const addQueryData = useCallback(() => {
    setData((data: IQueryDataset[]) => [
      ...data,
      {
        dataset: null,
        fields: [],
      },
    ])
  }, [])

  const changeQueryData = useCallback(
    (index: number, queryData: IQueryDataset) => {
      let dataNew = [...data]
      dataNew[index] = queryData
      setData(dataNew)
    },
    [data],
  )

  const deleteQueryData = useCallback(
    (index: number) => {
      let dataNew = [...data]
      dataNew.splice(index, 1)
      setData(dataNew)
    },
    [data],
  )

  const fetchData = useCallback(async () => {
    const datasetOptions = await datasetAPI.getListDataset()
    setDatasetOptions(datasetOptions)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const submitData = useCallback(() => {
    console.log('data', data)
    console.log(JSON.stringify(data))
  }, [data])

  return (
    <div className="container mx-auto flex h-screen  justify-center py-20">
      <Head>
        <title>Hệ thống tạo câu truy vấn data trực quan</title>
        <meta name="description" content="Hệ thống tạo câu truy vấn data trực quan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto  flex-col items-center space-y-20">
        {data.map((data: IQueryDataset, index: number) => (
          <QueryDatasetItem
            key={index}
            datasetOptions={datasetOptions}
            onChange={(queryData: IQueryDataset) => changeQueryData(index, queryData)}
            onDelete={() => deleteQueryData(index)}
          />
        ))}
        <div className="mt-5 flex w-full justify-center gap-x-4 pb-10">
          <div
            onClick={() => addQueryData()}
            className="flex w-fit min-w-[150px] cursor-pointer items-center justify-center rounded-md border  border-gray-400 bg-blue-300 px-4 py-2 md:min-w-[200px]"
          >
            <IconSVG className="h-10 w-10 pr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </IconSVG>
            Add Query Dataset
          </div>

          <div
            onClick={() => submitData()}
            className="flex w-fit min-w-[30vw] cursor-pointer items-center justify-center rounded-md border  border-gray-400 bg-green-300 px-4 py-2 md:min-w-[200px]"
          >
            <IconSVG className="h-10 w-10 pr-3">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </IconSVG>
            Get Data
          </div>
        </div>
      </div>
    </div>
  )
}
