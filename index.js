const express = require('express');
const mongoose = require('mongoose');
const shortURL = require('./models/shortURL');
const url = 'mongodb://localhost/shortener'
const app = express();

var methodOverride = require('method-override');

app.set('view engine' ,'ejs');
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));

mongoose.connect(url,{
    useNewUrlParser:true, useUnifiedTopology:true
});
app.listen(process.env.PORT || 3000);

app.get('/',async (req,res) => {
    const shortURLs = await shortURL.find();
    res.render('index',{shortURLs:shortURLs})
})
app.post('/shortURLs',async (req,res) => {
    await shortURL.create({
        full:req.body.fullURL
    })
    res.redirect('/')
});

app.get('/:shortUrl',async (req,res) => {
    const shortUrl = await shortURL.findOne({short: req.params.shortUrl})
    console.log(shortUrl.full);
    if(shortUrl === null || shortUrl === undefined) res.end("Sorry couldn't find the URL");

    res.redirect(shortUrl.full);
})

app.post('/delete',async(req,res)=>{

        const shorturl = await shortURL;
        const a1 = await shorturl.remove()
        console.log('Entries Cleared')
      // res.send('Entries Cleared')
      res.redirect('/')        
})

