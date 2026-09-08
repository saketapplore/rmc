// const JWT_SECRET = 'my-secret-key'
// const express = require('express')
// const app = express()


// app.use(express.json())

// app.use(express.urlencoded({ extended: true }))

// let users = [
//     { id: 1, name: "Saket", email: "saket@gmail.com" },
//     { id: 2, name: "Rahul", email: "rahul@gmail.com" }
//   ];

// //   app.get('/users' , (req,res) => {
// //     res.json(users)
// //   })

// //   app.get('/users/:id', (req,res) => {
// //     const user = users.find(user => user.id === parseInt(req.params.id))
// //     if(!user){
// //         return res.status(404).json({ message: 'User not found' })
// //     }
// //     res.json(user)
// //   })

// //   app.delete('users/:id', (req,res) => {
// //     const user = users.find(user => user.id === parseInt(req.params.id))
// //      if(!user){
// //         return res.status(404).json({ message: 'User not found' })
// //      }
// //      users = users.filter(user => user.id !== parseInt(req.params.id))
// //      res.status(204).send()
     
// //   })

// //   app.put('users/:id', (req,res) => {
// //     const user = users.find(user => user.id === parseInt(req.params.id))
// //     if(!user){
// //         return res.status(404).json({message: 'User not found'})
// //     }
// //     user.name = req.body.name
// //     user.email = req.body.email
// //     res.json(user)
// //   })

// //   app.post('/users' , (req,res) => {
// //     const newUser = {
// //         id: users.length +1,
// //         name: req.body.name,
// //         email: req.body.email
// //     }
// //     users.push(newUser)
// //     res.status(201).json(newUser)
// //   })

// // app.get('/', (req,res) => {
// //     res.send('Hello World')
// // })

// app.get('/users', (req,res) => {
//     res.json(users)
// })

// app.get('/users/:id', (req,res) => {
//     const user = users.find(user => user.id === parseInt(req.params.id))
//     if(!user){
//         return res.status(404).json({message: 'User not found'})
//     }
//     res.json(user)
// })

// app.post('/users', (req,res) => {

//     const {name,email} = req.body;

//     if(!name){
//         return res.status(400).json({message: 'Name is required'})
//     }

//     if(!email){
//         return res.status(400).json({message: 'Email is required'})
//     }

//     if(users.some(user => user.email === email)){
//         return res.status(400).json({message: 'Email already exists'})
//     }

//     const newUser = {
//         id: users.length + 1,
//         name: req.body.name,
//         email: req.body.email
//     }
//     users.push(newUser)
//     res.status(201).json(newUser)
// })

// app.delete('/users/:id', (req,res) => {
//     const user = users.find(user => user.id === parseInt(req.params.id))
//     if(!user){
//         return res.status(404).json({message: 'User not found'})
//     }
//     users = users.filter(user => user.id !== parseInt(req.params.id))
//     res.status(204).send()
// })

// app.put('/users/:id', (req,res) => {
//     const user = users.find(user => user.id === parseInt(req.params.id))

//     if(!user){
//         return res.status(404).json({message: 'User not found'})
//     }

//     user.name = req.body.name
//     user.email = req.body.email
//     res.json(user)
// })

// app.post('/login' , (req,res) => {
//     const {email, password} = req.body;

//     if(!email || !password){
//         return res.status(400).json({message: 'Email and password are required'})
//     }

//     const user = users.find(user => user.email === email)

//     if(!user || user.password !== password){
//         return res.status(401).json({message: 'Invalid credentials'})
//     }

//     const token = jwt.sign(
//         {id : user.id, email: user.email, role: user.role},
//         JWT_SECRET,
//         {expiresIn: '1h'}
//     )

//     res.json({token})   
//     res.status(200).json({message: 'Login successful'})
// })



// const requireAuth = (req,res,next) => {
//     const authHeader = req.headers.authorization

//     if(!authHeader){
//         return res.status(401).json({message: 'Unauthorized'})
//     }

//     const [type,token] = authHeader.split(' ')

//     if(type !== 'Bearer' || !token){
//         return res.status(401).json({message: 'Unauthorized'})
//     }

//     next()

// } 

// const requireAdmin = (req,res,next) => {
//     if(req.user.role !== 'admin'){
//         return res.status(403).json({message: 'Forbidden'})
//     }
//     next()
// }

// app.listen(3000, () => {
//     console.log('Server is running on port 3000')
// })

// module.exports = app



let products = [
    { id: 1, name: "Laptop", price: 50000, stock: 5 },
    { id: 2, name: "Phone", price: 20000, stock: 10 },
  ];
  
let orders = [];
let idempotencyStore = new Map();

class AppError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
    
}


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    res.status(status).json({
        message: err.message || 'Interval server error'
    })
})

app.post('/orders', (req,res,next) => {
    try{
    const {productId, quantity} = req.body;
    const userId = req.user.id;
    const idempotencyKey = req.headers['idempotencty-key'];

    if(idempotenctyKey && idempotencyStore.has(idempotenctyKey)){
        return res.status(200).json(idempotencyStore.get(idempotenctyKey))
    }

    if(!productId || !quantity){
        throw new AppError(400, 'Product ID and quantity are required')
    }

    if(typeof quantity !== 'number' || quantity <= 0){
        throw new AppError(400, 'Quantity must be a positive number')
    }

    const product = products.find(product => product.id === productId)
     if(!product){
        throw new AppError(404, 'Product not found')
     }

     if(product.stock < quantity){
        throw new AppError(400, 'Insufficient stock')
     }

     const order = {
        id: orders.length + 1,
        productId: productId,
        quantity: quantity,
        userId: userId,
        status: 'pending'
     }

     product.stock -= quantity;
     orders.push(order)

     if(idempotenctyKey){
        idempotencyStore.set(idempotenctyKey, order)
     }

     res.status(201).json(order)

} catch(err){
    next(err)
}
})
