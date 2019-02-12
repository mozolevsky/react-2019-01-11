import { createContext } from 'react'
import dictionaries from '../../dictionaries'

export const { Provider, Consumer } = createContext(dictionaries.en)
