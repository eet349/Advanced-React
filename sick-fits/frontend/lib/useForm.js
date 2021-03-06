import { useState } from 'react'

export default function useForm(initial = {}) {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial)


  function handleChange(e) {
    let { name, value , type} = e.target
    if(type === 'number') {
      value = parseInt(value)
    }
    if(type==='file') {
      value[0] = e.target.files
    }
    setInputs({
        ...inputs, [name]: value
      })
  }

  function resetForm() {
    setInputs(initial)
  }
  function clearForm() {
    let blankState = Object.entries(inputs).map(([key, value]) => [key, ''])
    blankState = Object.fromEntries(blankState)
    setInputs(blankState)
  }

  // Return the things we want to surface from this custom hook
  return [
    inputs,
    handleChange,
    resetForm,
    clearForm
  ]
}