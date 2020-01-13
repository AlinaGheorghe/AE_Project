import React, {Component} from 'react';
//import logo from './logo.svg';
import ProductStore from './ProductStore'
// eslint-disable-next-line
import Product from './Product'
// eslint-disable-next-line
import ProductForm from './ProductForm'

import {EventEmitter} from 'fbemitter'        //dependenta externa
// eslint-disable-next-line
import {StyleSheet, css} from 'aphrodite'    //dependenta externa pentru stiluri css

import './App.css';

const ee = new EventEmitter()
const store = new ProductStore(ee)

// eslint-disable-next-line
function addProduct(product){
  store.createOne(product)
}

// eslint-disable-next-line
function deleteProduct(id){
  store.deleteOne(id)
}

// eslint-disable-next-line
function saveProduct(id, product){
  store.saveOne(id, product)
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: [],
      homePageSelected: 1,
      productsPageSelected: 0,
      selected: null
    }
    this.selectProduct = (id) => {
      store.getOne(id)
      ee.addListener('SINGLE_PRODUCT_LOAD', () => {
        this.setState({
          selected : store.selected,
          detailsFor : store.selected.id
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('PRODUCT_LOAD', () => {
      this.setState({
        products : store.content
      })
    })
  }
  render(){
    if(!this.state.productsPageSelected){
        return(
        <div className="App">
            <h2>
              <p onClick={() => this.setState({productsPageSelected : 0, homePageSelected : 1})}> Sweets by Moonlight</p>
            </h2>
          <div className="nav">
              <p className="homePage" onClick={() => this.setState({productsPageSelected : 0, homePageSelected : 1})}> Home </p>
              <p className="productsPage" onClick={() => this.setState({productsPageSelected : 1, homePageSelected: 0})}> Products </p>
          </div>
          <div className="descriere">
            <div className="descrierePoza">
              <img src="../home.jpg" alt="Store Front" />
            </div>
            <div className="descriereText">
              <p className="about"> 
                We are a Romanian bakery, born from the passion for beautiful and delicate cakes, the desire of creating sweet and joyful products.
                <br/>Our bakers were trained in the art of making sweets, at various courses and conferences.
                <br/>We guarantee high quality products each and every time you pass our doorstep.
                <br/>Also, if you are not close enough to us to pay us a visit, we can send our delicious sweets right to your home.
              </p>
            </div>
          </div>
        </div>
      )
      }
      else if(this.state.productsPageSelected){
        return(
          <div className="App">
            <h2>
              <p onClick={() => this.setState({productsPageSelected : 0, homePageSelected : 1})}> Sweets by Moonlight</p>
            </h2>
          <div className="nav">
            <p className="homePage" onClick={() => this.setState({productsPageSelected : 0, homePageSelected : 1})}> Home </p>
            <p className="productsPage" onClick={() => this.setState({productsPageSelected : 1, homePageSelected: 0})}> Products </p>
          </div>
          <div className="catalogProduse">
            <ul>
              <li>
                <img src='./ffb.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Fresh Fruit Biscuits </p>
                <p className="pretProdus"> 6,00 lei </p>
              </li>
              <li>
                <img src='./rwb.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Red, White, Blue </p>
                <p className="pretProdus"> 400,00 lei </p>
              </li>
              <li>
                <img src='./rcd.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Rose Colored Day </p>
                <p className="pretProdus"> 700,00 lei </p>
              </li>
              <li>
                <img src='./fd.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Flower Delicacy </p>
                <p className="pretProdus"> 300,00 lei </p>
              </li>
              <li>
                <img src='./pm.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Popcorn Mania </p>
                <p className="pretProdus"> 150,00 lei </p>
              </li>
              <li>
                <img src='./ss.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Spooky Special </p>
                <p className="pretProdus"> 5,00 lei </p>
              </li>
              <li>
                <img src='./hc.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> Homemade Cookies </p>
                <p className="pretProdus"> 3,00 lei </p>
              </li>
              <li>
                <img src='./c.png' className="imagineProdus" alt=""/>
                <p className="numeProdus"> French Delight </p>
                <p className="pretProdus"> 2,50 lei </p>
              </li>
            </ul>
          </div>
        </div>
          )
      }
  }
}

export default App;
