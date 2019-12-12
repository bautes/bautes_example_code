import './_Login.scss'

import React, { useState, useEffect } from 'react'
import useReducerLanguage from '../reducers/languageReducer'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio
} from 'semantic-ui-react'

const Login = props => {
  const [{ permissions }] = useReducerLanguage()
  const [currentGender, setCurrentGender] = useState(null)
  useEffect(() => {
    console.log(permissions)
  }, [permissions])

  const genders = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

return <Form>
    <Form.Group widths='equal'>
      <Form.Field
        control={Input}
        label='Email address'
        placeholder='Email address'
      />
    </Form.Group>
    {permissions.gender ? <Form.Group inline>
      <label>Gender</label>
      {genders.map(gender => {
        return <Form.Field
          key={gender.key}
          control={Radio}
          label={gender.text}
          value={gender.value}
          checked={gender.value === currentGender}
          onChange={(e, { value }) => setCurrentGender(value)}
        />
      })}
    </Form.Group> : null }
    <Form.Field
      control={Checkbox}
      label='I’m above a certain age'
    />
    <Form.Field
      control={Checkbox}
      label='I want to receive a newsletter'
    />
    <Form.Field control={Button}>Submit</Form.Field>
  </Form>

}

export default Login
