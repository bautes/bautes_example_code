import { useState } from 'react'

const useForm = () => {
  let fields = []
  const [errors, setErrors] = useState({})
  const registerFieldFn = opts => ref => fields.push(Object.assign({}, opts, { ref }))

  const validateField = ({ required = false, ref }, idx, allFields) => {
    const { value, type, checked, name } = ref
    switch (type) {
      case 'email':
        return !(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i.test(value))
      case 'checkbox':
        return (required && !checked)
      case 'radio':
        return required && !allFields
          .filter(({ ref }) => ref.name === name)
          .some(({ ref }) => ref.checked)
      default:
        return (required && !!value.trim())
    }
  }

  const getFieldValue = ({ type, value, checked, name }, allFields) => {

    switch (type) {
      case 'checkbox':
        return checked
      case 'radio':
        try {
          return allFields.find(({ ref }) => ref.name === name && ref.checked).ref.value
        } catch (e) {
          return null
        }
      default:
        return value
    }
  }

  const validateAll = () => {
    const errors = fields
      .filter(validateField)
      .reduce((acc, { ref }) => ({ ...acc, [ref.name]: (ref.placeholder || ref.name) }), {})

      setErrors(errors)
    return !Object.values(errors).length
  }
  const getAllFields = () => fields.reduce((acc, { ref }) => ({ ...acc, [ref.name]: getFieldValue(ref, fields) }), {})
  const handleSubmit = callback => ev => {
    setErrors({})
    if (validateAll()) callback(getAllFields())
    return false
  }
  return {
    handleSubmit,
    register: registerFieldFn,
    errors
  }
}

export default useForm