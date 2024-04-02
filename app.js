const express = require('express')
const mongoose = require('mongoose')
const blog = require('./modals/blog');
const Blog = require('./modals/blog');


const app = express();

//connect to mongobd
const dbURI = 'mongodb+srv://simmi:test1234@cluster0.mlbtruo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err))



app.set('view engine', 'ejs')


// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title: ' new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     })

//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('6607e401083b73e7f0fa20ed')
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch(err=>console.log(err))
// })


app.use(express.urlencoded({extended:true}))//this takes the url encocded data and passes that into an object that we can use on the request object



app.get('/',(req,res)=>{
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index',{title : 'Home', blogs : blogs})

    res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'})
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title : 'Create a New Blog'})
})

//blog route

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs: result})
    })
    .catch((err)=>{
          console.log(err)  
    })
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body)

    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch(err => console.log(err))
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{ blog: result,title: 'Blog Details'})
    })
    .catch(err =>{
        res.status(404).render('404',{title: 'Insight not found'})
    })
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
})



app.use((req,res)=>{
    res.status(404).render('404',{title: '404'})
})

