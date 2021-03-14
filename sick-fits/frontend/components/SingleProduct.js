import {useQuery } from "@apollo/client"
import gql from "graphql-tag"
import ErrorMessage from '../components/ErrorMessage'
import Head from 'next/head'
import styled from 'styled-components'

const ProductStyles = styled.div`
display: grid;
grid-auto-columns: 1fr;
grid-auto-flow: column;
/* min-height: 800px; */
max-width: var(--maxWidth);
align-items: top;
gap: 2rem;
img {
  width: 100%;
  /* height: 100%; */
  object-fit: contain; /* not super sure what this does but it makes it so that the images don't look squished while the width gets smaller*/
}
`

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  Product(where: {
    id: $id
  }){
    name
    price
    description
    id
    photo {
        altText
      image {
        publicUrlTransformed
      }
    }
  }
}
`

export default function SingleProduct({ id }) {

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {id}
  })
  if(loading) return <p>Loading...</p>
  if(error) return <ErrorMessage error={error}/>
  const {name, photo, description } = data.Product

  return (<ProductStyles>
    <Head>
      <title>Sick Fits | {name}</title>
    </Head>
    <img src={photo.image.publicUrlTransformed} alt={photo.altText}/>
    <div className="details">
    <h2>{name}</h2>
    <p>{description}</p>
    </div>
  </ProductStyles>)
}