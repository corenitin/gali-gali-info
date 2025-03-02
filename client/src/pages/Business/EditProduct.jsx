import React from 'react'
import { useParams } from 'react-router'

function EditProduct() {
    const { id } = useParams();
    console.log(id)
  return (
    <div>EditProduct-{id}</div>
  )
}

export default EditProduct