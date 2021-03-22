import { useState } from "react"

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value }) // set [event.target.name] in values
  }

  const onSubmit = (event) => {
    event.preventDefault() // default action will not occur
    callback() // callback is different for different pages (ie. loginUserCallback or registerUser)
  }

  return { onChange, onSubmit, values }
}
