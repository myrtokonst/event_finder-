import React from 'react'

import CategoryComponent from '../components/CategoryComponent'

import { MDBContainer, MDBBadge, MDBCloseIcon } from "mdbreact"



const MyCategoriesContainer = (props) => {

return <div>
<MDBContainer border="dark" style={{ width: "30rem" }}>
<h4>Your Categories:</h4>
{props.cats.map(cat => <MDBBadge pill key = {cat.id} color="default" style={{margin:'3px'}} >
                            <MDBCloseIcon size="sm" onClick={() => props.deleteCat(cat.id)} style={{position: "relative", left:"0.2rem", top:"0.6rem"}}  />
                        <CategoryComponent key ={cat.id} 
                            handleCats={props.disselectCat} category={cat}
                            />
                        </MDBBadge>)}
</MDBContainer>
</div>

}
export default MyCategoriesContainer

