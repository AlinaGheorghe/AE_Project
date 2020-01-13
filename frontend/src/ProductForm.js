import React, {Component} from 'react'

class ProductForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            productTitle : '',
            productPrice : 0,
            productPhoto : ''
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
    }
    render(){
        return(
            <div>
                Title : <input type="text" name="productTitle" onChange={this.handleChange} /> <br/>
                Price : <input type="text" name="productPrice" onChange={this.handleChange} /> <br/>
                Photo : <input type="text" name="productPhoto" onChange={this.handleChange} /> <br/>
                <input className="btn" type="button" value="add" onClick={() => this.props.onAdd({title : this.state.productTitle, price : this.state.productPrice, photo : this.state.productPhoto})}/>
            </div>
            )
    }
}

export default ProductForm
