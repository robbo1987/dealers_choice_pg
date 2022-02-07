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
                        <a href = 'lawyers/${lawyer.id}'>
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

app.get('/lawyers/:id', async (req, res,next) => {
    try{ 
        let response= await client.query('Select * FROM lawyers WHERE id=$1',[req.params.id]);
        const lawyers = response.rows[0]
        response = await client.query('SELECT job_title.name AS jobName, job_title.lawyer_id, lawyers.* FROM lawyers JOIN job_title ON job_title.lawyer_id = lawyers.id WHERE lawyers.id=$1',[req.params.id]);
        const jobs = response.rows
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
             li{
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
                        Featured Attorney
                     </h2>
                    
                     <ul>
                     ${
                        jobs.map(job => `
                        <li>
                            ${job.jobname}
                        
                        </li>
                        `).join('')
                    }
                    </ul>
                    <h2>
                    <a href = '/'> Click Here to Return to Homepage </a>
                    </h2>
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