import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import useForm from '../lib/useForm';
import Form from './styles/Form'
import ErrorMessage from '../components/ErrorMessage'

const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION(
  # Which variables are getting passed in? and what types are they??
  $name: String!
  $description: String!
  $price: Int!
  $image: Upload
) {
  createProduct(data:{
    name: $name
    description: $description
    price: $price
    status: "AVAILABLE"
    photo: {
      create: {
        image: $image,
        altText: $name
        }
      }
  }) {
    id
    price
    description
    status
  }
}
`

const initialState = {
  name: '',
  description: '',
  price: '',
  image: '',
}
const CreateProduct = () => {
  const [formState, onChange , reset, clear]  = useForm(initialState)

  const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: formState
  })

  return (
    <Form onSubmit={async e=> {
      e.preventDefault()
      // Submit the input fields to the backend
      await createProduct()
      clear()
    }}>
      <ErrorMessage error={error}/>
      <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor='image'>
        Image
        <input name='image' type='file' id='name' placeholder='Name'  onChange={onChange} required/>
      </label>
      <label htmlFor='name'>
        Name
        <input name='name' type='text' id='name' placeholder='Name' value={formState.name} onChange={onChange}/>
      </label>
      <label htmlFor='name'>
        Price
        <input name='price' type='number' id='price' placeholder='Price' value={formState.price} onChange={onChange}/>
      </label>
      <label htmlFor='description'>
        Description
        <textarea name='description'  id='description' placeholder='Item description' value={formState.description} onChange={onChange}/>
      </label>
      <button type='submit' >+ Add Product</button>
      </fieldset>
      {/* <button type='button' onClick={clear}>Clear Form</button>
      <button type='button' onClick={reset}>Reset Form</button> */}
    </Form>
);
  }
export default CreateProduct