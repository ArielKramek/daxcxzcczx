const express = require('express');
const app = express()
app.use(express.json())
const port = 3000




const db= require("./db");
const res = require('express/lib/response');



app.get("/livros", async (req,res)=>{

    try{

        const resultado= await db.pool.query("SELECT * FROM LIVROS")
        res.status(200).json(resultado[0])

    }catch(erro){
        res.status(500).json({erro: erro.message})
    }


})



app.post("/livros", async(req,res)=>{

    try{

        const dados= req.body

        const resultado=await db.pool.query(
            "INSERT INTO LIVROS (nome,autor) VALUES(?,?)",
             [dados.nome,dados.autor ]
            )
            res.status(201).json({resultado:"Livro cadastrado, ID= "+resultado[0].insertId})
    }catch(erro){

        res.status(500).json({erro:erro.message})


    }


})










app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})