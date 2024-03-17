const express = require('express');
const app = express();
const PORT = 3000;

// Dados simulados de livros
const livros = [
    { id: 1, titulo: 'O Segredo', autor: 'Rhonda Byrne', ano: 2006 },
    { id: 2, titulo: 'Um Conto de Duas Cidades', autor: 'Charles Dickens', ano: 1859 },
    { id: 3, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', ano: 1997 },
    { id: 4, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J. K. Rowling', ano:1997 },
    { id: 5, titulo: 'Ela, a Feiticeira', autor: 'H. Rider Haggard', ano: 1887 },
    { id: 6, titulo: 'Um Conto de Duas Cidades', autor: 'Charles Dickens', ano: 1859 },
    { id: 7, titulo: 'Jogos Vorazes', autor: 'Suzanne Collins', ano: 2008},
    { id: 8, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
    { id: 9, titulo: ' A Viagem do Elefante', autor: 'José Saramago', ano: 2008 },
    { id: 10, titulo: 'Pássaros de Voo Curto', autor: 'Alcione Araújo', ano: 2008 },
];

// Rota principal
app.get('/', (req, res) => {
    // Inicialize resultados como um array vazio
    let resultados = [];
    
    res.render('index', { resultados });
});

// Rota para buscar livros
app.get('/buscar', (req, res) => {
    let resultados = livros;

    // Verificar se a busca é por título
    if (req.query.tipoBusca === 'titulo' && req.query.titulo) {
        const termoBusca = req.query.titulo.toLowerCase();
        resultados = resultados.filter(livro => livro.titulo.toLowerCase().includes(termoBusca));
    }

    // Verificar se a busca é por ano
    if (req.query.tipoBusca === 'ano' && req.query.ano) {
        const anoBusca = parseInt(req.query.ano);
        resultados = resultados.filter(livro => livro.ano === anoBusca);
    }

    res.render('index', { resultados });
});

// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs');

// Middleware para lidar com dados de formulário
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
