//inainte de a se porni serverul va trebui sa pornim baza de date cu mysql-ctl start

const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('project_db', 'root', '',
        { dialect : 'mysql',
          define: { timestamps : false}
        })

//tabela product
const Product = sequelize.define
    ('product',
        {
            title : {                       //tabela product va avea coloanele title, price si photo
                type : Sequelize.STRING,
                allowNull : false,
                validate : {
                    len: [3, 100]
                }
            }, 
            price : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            photo : {                       //va contine sursa catre poza 
                type : Sequelize.STRING,
                allowNull : false
            }
        }, {
            underscored : true            //scrierea va fi cu _, nu cu camel case 
        })

const app = express()
app.use(bodyParser.json())
app.use(express.static('../frontend/build'))   //semnalizeaza ce trebuie folosit pentru a putea rula aplicatia 

app.get('/create', (req, res, next) => {        //instructiune ce permite crearea tabelei product 
    sequelize.sync({force: true})
        .then(() => res.status(201).send('created'))
        .catch((error) => next(error))
})

app.get('/products', (req, res, next) => {                      //instructiune ce preia toate produsele din tabela product
    Product.findAll()
        .then((products) => res.status(200).json(products))     //products, la plural deoarece facem select * 
        .catch((error) => next(error))
})

app.post('/products', (req, res, next) => {                     //instructiune ce introduce un produs sau mai multe in tabela product
    Product.create(req.body)
        .then(() => res.status(201).send('created'))
        .catch((error) => next(error))
})

app.get('/products:id', (req, res, next) => {       //instructiune ce cauta un anumit produs dupa id-ul sau
    Product.findById(req.params.id)
        .then((product) => {
            if(product){                            //product, la singular deoarece facem select ... where id = product_id
                res.status(200).json(product)
            }
            else{
                res.status(404).send('not found')
            }
        })
        .catch((error) => next(error))
})

app.put('/products/:id', (req, res, next) => {      //instructiune ce face update la campuri deja existente in tabela product 
    Product.findById(req.params.id)
        .then((product) => {
            if(product){
                return product.update(req.body, {fields : ['title', 'price', 'photo']})
            }
            else{
                res.status(404).send('not found')
            }
        })
        .then(() => {
            if(!res.headersSent){
                res.status(201).send('modified')
            }
        })
        .catch((error) => next(error))
})

app.delete('/products/:id', (req, res, next) => {    //instructiune ce va sterge un produs cu un anumit id 
    Product.findById(req.params.id)
        .then((product) => {
            if(product){
                return product.destroy()
            }
            else{
                res.status(404).send('not found')
            }
        })
        .then(() => {
            if(!res.headersSent){
                res.status(201).send('deleted')
            }
        })
        .catch((error) => next(error))
})    
         
app.use((err, req, res, next) => {          //instructiune ce ne atentioneaza in momentul in care pe server s-a produs o eroare 
    console.warn(err)
    res.status(500).send('some error')
})

app.listen(8080)                            //server-ul asculta pe portul 8080





