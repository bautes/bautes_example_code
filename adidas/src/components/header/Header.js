import './_Header.scss'

import React from 'react';
import { Flag } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'

const Header = props => {
  const dispatch = useDispatch()
  
  return <header className="Header">{
    ['uk', 'de'].map(l => <Link to={l}><Flag className={classnames({ 'disabled': null === l })} key={l} name={l} onClick={() => setLanguage(l)} /></Link>)
  }</header>
}

export default Header