const express=require('express')
const routes=express.Router()

/* Select -------------------Obtener*/
// routes.get('/',(req,res)=>{
//     //res.send('Aquí si es el select')
//     req.getConnection((err,conn)=>{
//         if(err) return res.send(err)

//         conn.query('select * from libros',(err,rows)=>{
//             if(err) return res.send(err)

//             res.json(rows)
//         })

//     })
// })
routes.get("/:table",(req,res)=>{
    //res.send('Ahora si viene el select')
    req.getConnection((err,conn)=>{
        
        if (err) return res.send(err) // si existe un error retornarlo

        var ssql= 'SELECT * FROM ' + req.params.table
        conn.query(ssql,(err,rows)=>{
            if (err) return res.send(err)

            res.json(rows)
        })

    })
})

/// Insertar --------------------------

// routes.post('/',(req,res)=>{
//     //res.send('Aquí si es el insert into')
//     req.getConnection((err,conn)=>{
//         if(err) return res.send(err)

//         conn.query('INSERT INTO libros SET ?',[req.body],(err,rows)=>{
//             if(err) return res.send(err)

//             res.json("¡Add Ok!")
//         })

//     })
// })

routes.post("/:table",(req,res)=>{
    //res.send('Ahora si viene el select')
    req.getConnection((err,conn)=>{
        
        if (err) return res.send(err) // si existe un error retornarlo

        var ssql='INSERT INTO ' + req.params.table +' SET ?'
        conn.query(ssql,[req.body],(err,rows)=>{
            if (err) return res.send(err)

            res.json('Add Ok!')
        })

    })
})

/// Delete ----------------------------------------

// routes.delete('/:id',(req,res)=>{
//     //res.send('Aquí si es el delete from')
//     req.getConnection((err,conn)=>{
//         if(err) return res.send(err)

//         conn.query('DELETE FROM libros WHERE lib_id = ?',[req.params.id],(err,rows)=>{
//             if(err) return res.send(err)

//             res.json("¡Deleted Succesfully!")
//         })

//     })
// })

routes.delete("/:table/:field/:id",(req,res)=>{
    
    req.getConnection((err,conn)=>{
        
        if (err) return res.send(err) // si existe un error retornarlo

        var ssql= 'DELETE FROM '+ req.params.table +' WHERE '+req.params.field+' = ?'
        conn.query(ssql,[req.params.id],(err,rows)=>{
            if (err) return res.send(err)

            res.json('Deleted!')
        })

    })
})

/// Update-----------------------------------------

// routes.put('/:id',(req,res)=>{
//     req.getConnection((err,conn)=>{
//         if(err) return res.send(err)

//         conn.query('UPDATE libros SET ? WHERE lib_id = ?',[req.body,req.params.id],(err,rows)=>{
//             if(err) return res.send(err)

//             res.json("¡Updated Succesfully :)!")
//         })

//     })
// })

routes.put("/:table/:field/:id",(req,res)=>{
    
    req.getConnection((err,conn)=>{
        
        if (err) return res.send(err) // si existe un error retornarlo

        var ssql= 'UPDATE '+ req.params.table +' set ? WHERE '+ req.params.field +' = ?'
        conn.query(ssql,[req.body,req.params.id],(err,rows)=>{
            if (err) return res.send(err)

            res.status(201).json('Updated!')
        })

    })
})

module.exports=routes