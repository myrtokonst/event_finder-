import React from 'react'
import CategoryComponent from '../components/CategoryComponent'

import { MDBIcon, MDBBadge, MDBContainer } from "mdbreact";

const UnpickedCategoriesContainer = (props) => {
const {  unpickedCats} = props
return <div>
<MDBContainer style={{margin: '5px', padding: '1rem'}}>
<h4>Other Categories</h4>
{unpickedCats.map(cat => <MDBBadge className="Pill" pill color="primary" key={cat.id} style={{margin:'3px', padding:'1rem'}}>
  <MDBIcon icon="plus" size="sm"  onClick={() => props.selectCat(cat.id)} style={{position: "relative", right:"0rem", top:"2rem"}} /> 
   <CategoryComponent key ={cat.id} category={cat} /></MDBBadge>)}
</MDBContainer>
</div>
}

export default UnpickedCategoriesContainer

