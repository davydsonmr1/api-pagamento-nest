POST /conta  -- criar conta
{
  "nome": "João"
}


GET /conta -- listar contas

GET /conta/123456789  -- puxar conta pelo id 

POST /conta/depositar -- depositar algum valor
{
  "id": "123456789",
  "valor": 100
}

POST /conta/transferir -- tranferir saldo para outra conta
{
  "idOrigem": "123456789",
  "idDestino": "987654321",
  "valor": 50
}

POST /pagamento/pagar -- pagar algum valor 
{
  "idConta": "123456789",
  "valor": 200
}

POST /pagamento/transferir -- transferir pagamento
{
  "idOrigem": "123456789",
  "idDestino": "987654321",
  "valor": 75
}


