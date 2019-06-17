import React from 'react'
import CategoryComponent from '../components/CategoryComponent'

import { MDBIcon, MDBBadge, MDBContainer } from "mdbreact";

const UnpickedCategoriesContainer = (props) => {
const {  unpickedCats} = props
return <div>
<MDBContainer style={{margin: '5px'}}>
<h4>Other Categories</h4>
{unpickedCats.map(cat => <MDBBadge pill color="primary" key={cat.id} style={{margin:'5px'}}>
  <MDBIcon icon="plus"  onClick={() => props.selectCat(cat.id)} style={{position: "relative", left:"1.6rem", top:"1.5rem"}} /> 
   <CategoryComponent key ={cat.id} category={cat} /></MDBBadge>)}
</MDBContainer>
</div>
}

export default UnpickedCategoriesContainer

