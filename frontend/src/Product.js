import React, {Component} from 'react'

class Product extends Component{
    constructor(props){
        super(props)
        this.state = {
            productTitle : '',
            productPrice : 0, 
            productPhoto : '',
            isEditing : false
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
    }
    componentDidMount(){
        this.setState({
            productTitle: this.props.product.title,
            productPrice: this.props.product.price, 
            productPhoto: this.props.product.photo
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isEditing : false,
            productTitle : nextProps.product.title,
            productPrice : nextProps.product.price,
            productPhoto : nextProps.product.photo
        })
    }
    
    render(){
        if(!this.state.isEditing){
            return(
                <tr>
                    <td>{this.props.product.id}</td>
                    <td>{this.props.product.title}</td>
                    <td>{this.props.product.price}</td>
                    <td>{this.props.product.photo}</td>
                    <td><input className="btn" type="button" value="Edit" onClick={() => this.setState({isEditing : true})} /></td>
                    <td><input className="btn" type="button" value="Delete" onClick={() => this.props.onDelete(this.props.product.id)} /></td>
                </tr>
                )
        }
        else{
            return(
                <div>
                    <input type="text" name="productTitle" onChange={this.handleChange} value={this.state.productTitle} />
                    <input type="text" name="productPrice" onChange={this.handleChange} value={this.state.productPrice} />
                    <input type="text" name="productPhoto" onChange={this.handleChange} value={this.state.productPhoto} />
                    <input className="btn" type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
                    <input className="btn" type="button" value="save" onClick={() => this.props.onSave(this.props.product.id, {title: this.state.productTitle, price: this.state.productPrice, photo : this.state.productPhoto})} />
                    <input className="btn" type="button" value="details" onClick={() => this.props.onSelect(this.props.product.id)} />
                </div>
                )
        }
    }
}

export default Product
