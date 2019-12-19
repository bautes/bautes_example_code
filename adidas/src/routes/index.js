import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../redux/actions/languageActions'
import Header from '../components/header/Header'
import Login from '../components/login/Login'
import Thankyou from '../components/thank-you/Thankyou'
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE } from '../intl/i18n'

const Routes = () => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const dispatchLanguage = l => dispatch(setLanguage(l))
  const lang = useSelector(({language}) => language.lang )

  return <Router >
    <Header />
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
        <Redirect to={`/${DEFAULT_LANGUAGE}`} />
      </Route>
    </Switch>
  </Router>
}


export default Routes