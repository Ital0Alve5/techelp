## Dependências:
- **Java 21 >**
- **PostgreSQL**
- **Node 16 >**

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
- **Porta:** `5433`

---

### Para subir o servidor:

1. Vá na classe `ApiApplication.java` e execute com o play no canto superior direito conforme a imagem:
   ![image](https://github.com/user-attachments/assets/56813761-137b-42cf-9097-1bf48357dc1e)

2. Para testar se a API está funcionando, utilize o **Postman** para fazer uma requisição para `localhost:8080` e o resultado deve ser a frase **"opa, tamo aí"**:
   ![image](https://github.com/user-attachments/assets/f6149847-5524-44aa-ae7b-5c9ef8fd4d8b)

---

### Para iniciar o frontend:

1. Com a API funcionando, não feche o terminal. Abra outro terminal e vá para o diretório **frontend** para executar o comando:

   ```bash
   npm install
