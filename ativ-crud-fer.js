const http = require('http')

let camisas =[{
    id: 1,
    cor:'preta',
    numeracao: 10,
    nome: 'Neymar'
}]

const server = http.createServer((req, res) => {
    const metodo = req.method;
    const url = req.url;
 res.setHeader('Content-type', 'application/json');

    if (url === '/sfcCamisas' && metodo === 'GET'){
        res.statusCode = 200;
        res.end(JSON.stringify(camisas));
        return;
    }

    // POST
    if(url === '/sfcCamisas' && metodo === 'POST'){
        let body = ''; 
        req.on('data', parte => {
            body += parte 
        });
        req.on('end', () => {
            const novaCamisa = JSON.parse(body); 
            livros.push(novaCamisa);
            res.statusCode = 201; 
            res.end(JSON.stringify({
                mensagem: 'Camisa inserida com sucesso!',
                camisa: novaCamisa
            }))
        }) 
        return; 
    }

    // PUT 
    if (url === '/sfcCamisas' && metodo === 'PUT'){
        let body = '';
        req.on('data', parte => {
            body += parte;
        });
        req.on('end', () => {
            const camisaAtualizada = JSON.parse(body);
            camisas = camisas.map(camisa => {
                if(camisa.id === camisaAtualizada.id){
                    return camisaAtualizada;
                }
                return camisa;
            });
            res.statusCode = 200;
            res.end(JSON.stringify({
                mensagem: 'Camisa atualzada com sucesso!',
                camisas:camisas
            }));
        });
        return;
    }

    // DELETE
    if(url === '/sfcCamisas' && metodo === 'DELETE'){
        let body = '';
        req.on('data', parte => {
            body+=parte;
        });
        req.on('end', () => {           
            const dados = JSON.parse(body);

            camisas = camisas.filter(camisa => camisa.id !== dados.id);
            res.statusCode = 200;
            res.end(JSON.stringify({
                mensagem: 'camisa removida com sucesso!',
                camisas:camisas
            }))
        })
        return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({
        mensgaem: 'Rota não encontrada.'
    }))
    });

    server.listen(3000, () => {
        console.log('http://localhost:3000')
    })