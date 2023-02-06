import app from './app.js';

app.listen(process.env.PORT,()=>{
    console.log(`Running on port ... `.white +
    'http://localhost:3000/api/employees' .green)
})