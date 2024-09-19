## Dependências:
- **Java 21 >**
- **PostgreSQL**
- **Node 18 >**

## IDE recomendada:
- **VSCode**

## Extensões recomendadas do VSCode:
- **Extension Pack for Java**
- **Spring Boot Extension Pack**
- **Lombok Annotations Support for VSCode**
- **Postman** (ou qualquer client do seu interesse)
- Se você tem a extensão "Code Runner" instalada, **desabilite-a**.

---

O Spring não sobe se a conexão com o banco de dados não for bem-sucedida. 
É necessário já ter criado o usuário e banco de dados. Seguem os dados do banco para uma conexão bem-sucedida:

- **Nome do banco:** `techelp`
- **Usuário:** `root`
- **Senha:** `root`
- **Porta:** `5432`

---

### Para subir o servidor da API:

1. Vá na classe `ApiApplication.java` e execute com o play no canto superior direito conforme a imagem:
   ![image](https://github.com/user-attachments/assets/56813761-137b-42cf-9097-1bf48357dc1e)

2. Para testar se a API está funcionando, utilize o **Postman** para fazer uma requisição para `localhost:8080` e o resultado deve ser a frase **"opa, tamo aí"**:
   ![image](https://github.com/user-attachments/assets/f6149847-5524-44aa-ae7b-5c9ef8fd4d8b)

---

### Para iniciar o frontend:

Com a API funcionando, não feche o terminal, abra um outro e vá para o diretório frontend para executar o comando:
```bash
npm install
```

A pasta node_modules surgirá com as dependências. Para subir o server do Angular, digite o comando:
```
ng serve --open
```

Abra a página localhost:4200 que é a porta padrão do Angular.

Se tudo deu certo, você deverá ver a resposta da API exibida na tela:

![image](https://github.com/user-attachments/assets/c8857df9-79b4-4557-a31d-49eb2e3c35b7)

