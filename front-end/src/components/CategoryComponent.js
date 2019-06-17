import React from 'react'



function CategoryComponent (props) {
    const { name } = props.category
    return <h6>{name}</h6>
}
export default CategoryComponent