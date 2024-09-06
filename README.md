Dependências:
Java 21 >
Postgresql
Node 16 >

IDE recomendada:
VsCODE

Extensões recomendadas do VsCode:
Extension pack for java
Spring boot extension pack
Lombok annotations support for vs code
Postman (ou qualquer client do seu interesse)
Se você tem a extensão "coderunner" instalada, desabilete-a.

O Spring não sobe se a conexão com o banco de dados não for bem sucedida. 
É necessário já ter criado o usuário e banco de dados. Seguem os dados do banco para uma conexão bem sucedida:
nome do banco: techelp
usuário: root
senha: root
porta: 5433

Para subir o server, vá na classe ApiApplication.java e execute com o play no canto superior direito conforme a imagem:
![image](https://github.com/user-attachments/assets/56813761-137b-42cf-9097-1bf48357dc1e)

Para testar se a api está funcionando, utilize o postman para fazer uma requisição para localhost:8080 e o resultado deve ser a frase "opa, tamo aí":
![image](https://github.com/user-attachments/assets/f6149847-5524-44aa-ae7b-5c9ef8fd4d8b)

Com a API funcionando, não feche o terminal, abra um outro e vá para o diretório frontend para executar o comando:
npm install

A pasta node_modules surgirá com as dependências.
Para subir o server do Angular, digite o comando:
ng serve --open

Abra a página localhost:4200 que é a porta padrão do Angular.

Se tudo deu certo, você deverá ver a resposta da API exibida na tela:
![image](https://github.com/user-attachments/assets/c8857df9-79b4-4557-a31d-49eb2e3c35b7)

