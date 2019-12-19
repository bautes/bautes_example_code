import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../redux/actions/languageActions'
import { Flag } from 'semantic-ui-react'
import classnames from 'classnames'
import Login from '../components/login/Login'
import Thankyou from '../components/thank-you/Thankyou'
import { useTranslation } from 'react-i18next';

const langs = ['uk', 'de']

const Routes = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const dispatchLanguage = l => dispatch(setLanguage(l))
  const lang = useSelector(({language}) => language.lang )

  return <Router >
    <div>
      <nav>
        <ul>{langs.map(l => (
          <Link key={l} to={l}>
            <Flag className={classnames({ 'hidden': null === l })} name={l} />
          </Link>
        ))
        }</ul>
      </nav>
      <Switch>
        <Route exact path="/thank-you"><Thankyou /></Route>
        <Route path="/:lang" render={({ match: { params }}) => {
          if (lang !== params.lang) {
            dispatchLanguage(params.lang)
            i18n.changeLanguage(params.lang);
          }
          return <Login />
        }} />
        <Route exact path="/">
          <Redirect to="/de" />
        </Route>
      </Switch>
    </div>
  </Router>
}


export default Routes