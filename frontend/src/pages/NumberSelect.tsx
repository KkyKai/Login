import {Select, SelectProps} from '@mantine/core'
import {FC} from 'react'

interface NumberSelectProps extends Omit<SelectProps, 'value'|'onChange'>{
  value: number,
  onChange: (value: number) => void,
}

const NumberSelect: FC<NumberSelectProps> = props => {
  const {value, onChange, ...otherProps} = props
  return (
    <Select {...otherProps} value={value.toString()} onChange={it => onChange(Number(it) || 0)}/>
  )
}

export default NumberSelect