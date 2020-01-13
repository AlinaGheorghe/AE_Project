import axios from 'axios'           //este o dependenta externa
const SERVER = 'http://localhost:8080/'

class ProductStore{
    constructor(ee){
        this.content = []
        this.ee = ee
        this.selected = null
    }
    getAll(){
        axios(SERVER + '/products')             //daca nu punem axios.get il presupune get
            .then((response) => {
                this.content = response.data
                this.ee.emit('PRODUCT_LOAD')    //ee event emit?
            })
            .catch((error) => console.warn(error))
    }
    createOne(product){
        axios.post(SERVER + '/products', product)
            .then(() => this.getAll())
            .catch((error) => console.warn(error))
    }
    deleteOne(id){
        axios.delete(SERVER + '/products/' + id)
            .then(() => this.getAll())
            .catch((error) => console.warn(error))
    }
    saveOne(id, product){
        axios.put(SERVER + '/products/' + id, product)
            .then(() => this.getAll())
            .catch((error) => console.warn(error))
    }
    getOne(id){
        axios(SERVER + '/products/' + id)
            .then((response) => {
                this.selected = response.data
                this.ee.emit('SINGLE_PRODUCT_LOAD')
            })
            .catch((error) => console.warn(error))
    }
}

export default ProductStore