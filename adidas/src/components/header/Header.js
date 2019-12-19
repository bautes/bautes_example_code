import './_Header.scss'

import React from 'react';
import { Flag } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { LANGUAGES } from '../../intl/i18n'

const Header = () => {
   return (
     <nav>
       <ul>{LANGUAGES.map(l => (
         <Link key={l} to={l}>
           <Flag name={l} />
         </Link>
       ))
       }</ul>
     </nav >
   )
}

export default Header