import { useDispatch } from 'react-redux'
import { setLanguage } from './languageActions'

export const dispatchSetLanguage = () => {
  const dispatch = useDispatch()
  return lang => dispatch(setLanguage(lang))
}