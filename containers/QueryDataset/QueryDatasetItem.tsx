import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InputSelect from '../../components/Input/InputSelect'
import IconSVG from '../../components/Icon/IconSVG'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { LIST_AGGREGATION } from '../../constants/dataset'
import { datasetAPI } from '../../services/dataset.service'
import classNames from 'classnames'
import Field from './Field'
const LIST_FIELDS = [
  {
    name: 'country',
    type: null,
  },
]

interface IQueryDatasetItemProps {
  onDelete: () => void
  datasetOptions: any
  onChange: (queryData: IQueryDataset) => void
}
export default function QueryDatasetItem({
  datasetOptions,
  onChange,
  onDelete,
}: IQueryDatasetItemProps) {
  const [dataset, setDataset] = useState<IDataset | null>(null)
  const [fields, setFields] = useState<IField[]>([])
  const [showMenuAdd, setShowMenuAdd] = useState(false)
  const [fieldOptions, setFieldOptions] = useState<IFieldResponse[]>([])
  const refAddField = useRef(null)

  useOnClickOutside(refAddField, () => setShowMenuAdd(false))

  useEffect(() => {
    onChange({
      dataset,
      fields,
    })
  }, [fields, dataset])

  const changeTypeField = useCallback(
    (indexField: number, typeNew: string | null) => {
      const newFields = [...fields]
      newFields[indexField].type = typeNew
      setFields(newFields)
    },
    [fields],
  )

  const removeField = useCallback(
    (indexField: number) => {
      let newFields = [...fields]
      newFields.splice(indexField, 1)
      setFields(newFields)
    },
    [fields],
  )

  const addField = useCallback(
    (payload: IField) => {
      let newElement = {
        name: payload.name,
        type: null,
      }
      let newFields = [...fields, newElement]
      setFields(newFields)
    },
    [fields],
  )

  const fetchListField = useCallback(async () => {
    if (!dataset) return []
    const listField = await datasetAPI.getListField(dataset?.name)
    setFieldOptions(listField as IFieldResponse[])
  }, [dataset])

  useEffect(() => {
    fetchListField()
  }, [dataset])

  return (
    <div className="w-fit">
      <div className="ml-6 font-bold">{dataset?.name}</div>
      <div className="flex flex-col gap-y-2 md:flex-row md:items-center">
        <div className="flex min-w-[300px] max-w-[90vw] flex-wrap items-center gap-x-4 gap-y-4 rounded-[40px] border border-gray-400  px-6 py-6 sm:px-11 sm:py-8 md:max-w-[60vw]">
          {!dataset ? (
            <InputSelect
              placeholder="Chọn dataset"
              fieldValue="id"
              fieldLabel="name"
              className="min-w-[200px]"
              options={datasetOptions}
              onChange={(option: any) => {
                setDataset(option)
                setFields([])
              }}
              value={dataset}
            />
          ) : (
            <>
              {fields.map(({ name, type }, index) => (
                <Field
                  key={index + name}
                  name={name}
                  type={type}
                  changeType={(typeNew: string | null) => changeTypeField(index, typeNew)}
                  removeField={() => removeField(index)}
                />
              ))}
              <div className="relative flex min-w-[100px] px-4">
                <div
                  onClick={() => setShowMenuAdd(true)}
                  className={classNames(
                    'flex w-fit cursor-pointer items-center justify-center rounded-full border border-black bg-gray-400  p-2 text-2xl',
                    { invisible: showMenuAdd },
                  )}
                >
                  <IconSVG>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </IconSVG>
                </div>

                {showMenuAdd && (
                  <div ref={refAddField} className="absolute left-0 top-0">
                    <InputSelect<IFieldResponse>
                      placeholder="Chọn field"
                      fieldValue="id"
                      fieldLabel="name"
                      className="!min-w-[140px]"
                      options={fieldOptions}
                      onChange={(option: any) => {
                        addField(option)
                        setShowMenuAdd(false)
                      }}
                      value={null}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row">
          <IconSVG
            onClick={() => {
              setDataset(null)
              setFields([])
            }}
            className="ml-5 h-12 w-12 cursor-pointer rounded-full border border-gray-400 p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </IconSVG>

          <IconSVG
            onClick={onDelete}
            className="ml-5 h-12 w-12 cursor-pointer rounded-full border border-gray-400 p-2 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </IconSVG>
        </div>
      </div>
    </div>
  )
}
