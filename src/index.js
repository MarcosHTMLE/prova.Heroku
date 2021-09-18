import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
   try {
       let produtos = await db.tb_produto.findAll({order: [['id_produto', 'desc']] });
       resp.send(produtos);
   } catch (e) {
      resp.send({ erro: e.toString}) 
   }
})

app.post('/produto', async (req, resp) => {
    try {

        let { nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao} = req.body;
        
      
        if(isNaN(vl_avaliacao)){
            return  resp.send({erro:"O Campo Avaliação só aceita números"});
          }
          
          if(isNaN(qtd_estoque)){
              return  resp.send({erro:"O Campo Estoque só aceita números"});
            }

            if(isNaN(vl_preco_de)){
              return  resp.send({erro:"O Campo Preço de só aceita números"});
            }

            if(isNaN(vl_preco_por)){
              return  resp.send({erro:"O Campo Preço por só aceita números"});
            }

            let msmproduto = await db.tb_produto.findOne({
                where:{
                    nm_produto:nm_produto
                }
            })
        
        
            if(msmproduto != null)
            return resp.send({erro: "Produto já existe"})
            

        let r = await db.tb_produto.create({
            nm_produto: nm_produto, 
            ds_categoria: ds_categoria, 
            vl_preco_de: vl_preco_de,
            vl_avaliacao: vl_preco_por,
            vl_avaliacao: vl_avaliacao,
            ds_produto: ds_produto,
            qtd_estoque: qtd_estoque, 
            img_produto: img_produto,
            bt_ativo: bt_ativo,
            dt_inclusao: dt_inclusao
        })
        resp.send(r);
    } catch (e) {
       resp.send({ erro: e.toString}) 
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let { nm_produto, ds_categoria, vl_preco_de, vl_preco_por, vl_avaliacao, ds_produto, qtd_estoque, img_produto, bt_ativo, dt_inclusao} = req.body;
        let id  = req.params.id;

        let r = await db.tb_produto.update(
            { 
                nm_produto: nm_produto, 
                ds_categoria: ds_categoria, 
                vl_preco_de: vl_preco_de,
                vl_avaliacao: vl_preco_por,
                vl_avaliacao: vl_avaliacao,
                ds_produto: ds_produto,
                qtd_estoque: qtd_estoque, 
                img_produto: img_produto,
                bt_ativo: bt_ativo,
                dt_inclusao: dt_inclusao
                },
                {
                where: { id_produto: id }
                }
        )
        resp.sendStatus(200);
        
    } catch (e) {
       resp.send({ erro: e.toString}) 
    }
})

app.delete('/produto/:id', async (req, resp) => {
    try {
        let id  = req.params.id;
        let r = await db.tb_produto.destroy({ where: {id_produto: id} })

        resp.sendStatus(200);
    } catch (e) {
       resp.send({ erro: e.toString}) 
    }
})


app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))