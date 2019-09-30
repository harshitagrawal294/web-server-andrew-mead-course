const path=require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

//Define paths for express config
const viewsPath= path.join(__dirname,"../templates/views")
const publicDirPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,"../templates/partials")


//Set up handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//rendering static webpages from public directory-- static directory to serve
app.use(express.static(publicDirPath))

// rendering from views templates-- index, about and help
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Harshit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Harshit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is helpful text',
        name:'Harshit'
    })
})

//send text/object/array directly to webpage
app.get('/help/data',(req,res)=>{
    res.send('This is help data')
})


//No match character must come at last...express looks serially for a match for url matching
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help 404',
        message:'help article not found',
        name: 'Harshit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                address:req.query.address,
                forecast:forecastData
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message:'Page you are looking for dne',
        name: 'Harshit'
    })
})



// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Harshit',
//         age:19
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send([1,2,6])
// })



app.listen(port,()=>{
    console.log('Server is up on port '+port)
})