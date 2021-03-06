import useForm from '../lib/useForm';
import Form from './styles/Form'

const initialState = {
  name: '',
  description: null,
  price: '',
}
const CreateProduct = () => {
  const [formState, onChange , reset, clear]  = useForm(initialState)
  return (
    <Form>
      <fieldset disabled aria-busy>

      <label htmlFor='name'>
        Name
        <input name='name' type='text' id='name' placeholder='Name' value={formState.name} onChange={onChange}/>
      </label>
      <label htmlFor='name'>
        Price
        <input name='price' type='number' id='price' placeholder='Price' value={formState.price} onChange={onChange}/>
      </label>
      <button type='button' >+ Add Product</button>
      </fieldset>
      {/* <button type='button' onClick={clear}>Clear Form</button>
      <button type='button' onClick={reset}>Reset Form</button> */}
    </Form>
);
  }
export default CreateProduct