import React, { useMemo, useRef, useState } from 'react'
import { LIST_AGGREGATION } from '../../constants/dataset'
import IconSVG from '../../components/Icon/IconSVG'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import classNames from 'classnames'

interface IFieldProps {
  name: string
  type: string | null
  removeField: () => void
  changeType: (typeNew: string | null) => void
}

export default function Field({ name, type, changeType, removeField }: IFieldProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const refDropdown = useRef(null)
  useOnClickOutside(refDropdown, () => setOpenDropdown(false))
  const style = useMemo(() => {
    let { color, backgroundColor } =
      Object.values(LIST_AGGREGATION).find((item) => item.value == type) || {}
    return { color, backgroundColor }
  }, [type])
  return (
    <div
      ref={refDropdown}
      className={classNames(
        'relative',

        { 'z-10': openDropdown },
      )}
    >
      <div
        style={style}
        onClick={() => setOpenDropdown((x) => !x)}
        className="flex w-full cursor-pointer items-center  justify-center rounded-md border border-black bg-blue-400 px-3 py-1 text-white"
      >
        {type ? `${type}(${name})` : name}
      </div>
      <IconSVG
        strokeWidth={1.5}
        onClick={() => removeField()}
        className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full border-none bg-white text-red-500"
      >
        <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </IconSVG>
      {openDropdown && (
        <div className="absolute -bottom-2 left-0 translate-y-full rounded-sm border border-black bg-gray-50 p-3 text-black">
          <p className="mb-3 font-bold">Aggregation</p>
          <ul className="space-y-2">
            {Object.values(LIST_AGGREGATION).map((item) => {
              return (
                <li
                  key={item.label}
                  className="cursor-pointer rounded-md  border px-2 py-1 hover:brightness-75"
                  style={{ color: item.color, backgroundColor: item.backgroundColor }}
                  onClick={() => {
                    changeType(item.value)
                    setOpenDropdown(false)
                  }}
                >
                  {item.label}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
