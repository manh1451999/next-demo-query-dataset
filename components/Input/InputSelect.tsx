import classNames from 'classnames'
import React, { useMemo } from 'react'
import Select from 'react-select'

interface IInputSelectProps<T> {
  options: Array<any>
  className?: string
  value: any
  onChange: (choice: T | T[]) => void
  fieldValue?: string
  fieldLabel?: string
  [x: string]: any
}

export default function InputSelect<T>({
  options,
  className = '',
  value,
  onChange,
  fieldValue = 'value',
  fieldLabel = 'label',
  ...rest
}: IInputSelectProps<T>) {
  const valueComputed = useMemo(() => {
    return options.find((option) => option[fieldValue] == (value?.[fieldValue] || value))
  }, [value, options, fieldValue])
  return (
    <Select
      value={valueComputed}
      className={classNames('min-w-[200px]', className)}
      classNamePrefix="select"
      options={options}
      getOptionLabel={(option) => option[fieldLabel]}
      getOptionValue={(option) => option[fieldValue]}
      onChange={onChange}
      {...rest}
    />
  )
}
