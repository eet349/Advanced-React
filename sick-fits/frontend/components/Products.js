import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from 'styled-components'
import Product from "./Product";

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY{
    allProducts{
      id
      name
      price
      description
      photo{
        id
        image{
          publicUrlTransformed
        }
      }
    }
  }
`
const ProductsListStyled = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 60px;
`

export default function ProductsPage() {
  const {data, error, loading} = useQuery(ALL_PRODUCTS_QUERY)
  console.log(data, error, loading )
  if(loading) return <p>loading...</p>
  if(error) return <p>Error: {error.message}</p>


  const renderProducts = () => {
    const mappedProductData = data.allProducts.map(product => {
      return <Product key={product.id} product={product}/>
    })
    return mappedProductData
  }

  return (
    <div>
      <ProductsListStyled>
        {renderProducts()}
      </ProductsListStyled>
    </div>
  );
}