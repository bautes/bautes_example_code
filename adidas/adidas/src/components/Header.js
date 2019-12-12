import './_Header.scss'

import React from 'react';
import { Flag } from 'semantic-ui-react'
import useReducerLanguage from '../reducers/languageReducer'
import classnames from 'classnames'

const Header = props => {
  const [{lang}, {setLanguage}] = useReducerLanguage()
  return <header className="Header">{
    ['uk', 'de'].map(l => <Flag className={classnames({ 'disabled': lang == l})} key={l} name={l} onClick={() => setLanguage(l)} />)
  }</header>
}

export default Header