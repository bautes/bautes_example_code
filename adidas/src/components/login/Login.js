import './_Login.scss'

import React, { useState, useEffect } from 'react'
// import useForm from 'react-hook-form'
import useForm from '../../hooks/useForm'
import { Button, Popup, Form} from 'semantic-ui-react'
import { useSelector, shallowEqual } from 'react-redux'
import { doRegister } from '../../api/registerService'
import { withRouter } from "react-router";
import { Message } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';


const Login = ({ history }) => {
  const { t } = useTranslation()
  const [hasError, setHasError] = useState(false)
  const { handleSubmit, register, errors } = useForm()
  const {gender, newsletter} = useSelector(({ language }) => language.permissions, shallowEqual)
  const [showGenders, setShowGenders] = useState(gender)
  const [showNewsletter, setShowNewsletter] = useState(gender)

  
  const genders = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  useEffect(() => {
    setShowGenders(gender)
    setShowNewsletter(newsletter)
  }, [gender, newsletter])

  const redirectTo = ({message}) => {
    if (message) return history.replace('/thank-you', {message})
    history.replace('/', { message })
  } 

  const onSubmit = formData => {
    doRegister(formData)
      .then(redirectTo)
      .catch(resp => setHasError(true))
  }

  return (
    <>
    {
      Object.keys(errors).length || hasError ?
        <Message warning>
          {Object.values(errors).map(e => <Message.Header key={e}>{e} {t('is required')}</Message.Header>)}
          {hasError ? <Message.Header>{t('A problem happened, please try later again')}</Message.Header> : null}
        </Message> :
        null
    }
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field error={!!errors.email}>
        <label>{t('Email address')}</label>
        <input
          ref={register({required: true})}
          name="email"
          type='email'
          placeholder={t('Email address')}
        />
      </Form.Field>
      {showGenders ? <Form.Field inline error={!!errors.gender}>
        <label>{t('Gender')}</label>
        {genders.map(gender => {
          return <div key={gender.key}><input
            ref={register({ required: showGenders })}
            name="gender"
            placeholder="Gender"
            type='radio'
            value={gender.value}
          /><label>{gender.text}</label></div>
        })}
      </Form.Field> : null}
      <Form.Field error={!!errors.checkAge}>
        <label>{t('I’m above a certain age')}</label>
        <input
          ref={register({ required: true })}
          name="checkAge"
          type='checkbox'
          placeholder={t('Age consentment')}
        />
        <Popup content={t('By law you must be older than a certain age')} trigger={<Button icon='help' />} />
      </Form.Field>

      {showNewsletter ? <Form.Field error={!!errors.newsletter}>
        <label>{t('I want to receive a newsletter')}</label>
        <input
          ref={register()}
          name="newsletter"
          placeholder="Newsletter"
          type='checkbox'
        />
      </Form.Field> : null}
      <Form.Field control={Button}>{t('Submit')}</Form.Field>
    </Form>
    </>
  )
}

export default withRouter(Login)
