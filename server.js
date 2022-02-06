console.log('hello world');
const {client, synchAndSeed} = require('./db.js')
const express = require('express')
const app = express();

app.get('/', async (req, res,next) => {
   try{ 
       const response= await client.query('Select * FROM lawyers');
       const lawyers = response.rows
       res.send(`
       <html>
            <head>
            <style>
            body{
                background-color:aquamarine;
            }
            h1 {
                font-family:verdana;
                padding:1rem;
                
            }
            h2 {
                font-family:verdana;
                padding:1rem;
            }
            li>a{
                font-family:verdana;
                padding:1rem;
                color:red;
                font-weight:bold;
            }
            </style>
                <body>
                    <h1>
                        Robby's Law Firm
                    </h1>
                    <h2>
                        LAWYER LIST
                    </h2>
                    <ul>
                    ${
                        lawyers.map(lawyer => `
                        <li>
                        <a href = 'lawyers/${lawyer.name}'>
                            ${lawyer.name}
                        </a>
                        </li>
                        `).join('')
                    }
                    
                    </ul>
                </body>
            </head>
       </html>
       `)
   }


   catch (ex){
        next(ex)
   }
})




const port = process.env.PORT || 3000;



const setup = async() => {
try{

    await client.connect();
    await synchAndSeed()
    console.log('connected to database');
    app.listen(port,() => {
        console.log(`listening on port ${port}`);
    })
}

catch(ex) {
        console.log(ex);

}


}


setup();