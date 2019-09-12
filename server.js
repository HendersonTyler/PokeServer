const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'score'
    }
});

db.select('*').from('score').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    score: [
        {
            name: 'John',
            pokemon: 'eevee',
            tally: 3
        },
        {
            name: 'John',
            pokemon: 'eevee',
            tally: 3
        }
    ]
}

app.get('/', (req, res) => {
    db.select('*').from('score').then(data => {
        res.send(data);
    })
})

app.post('/score', (req, res) => {
    const { name, pokemon, tally } = req.body;
    db('score')
        .returning('*')
        .insert({
            name: name,
            pokemon: pokemon,
            tally: tally
        }).then(score => {
            res.json(score[0])
        })
        .catch(err => res.status(400).json('Error sending score'))

})

app.get('/top', (req, res) => {
    db('score').orderBy('tally', 'desc').limit(10).then(data => {
        res.send(data);
    })
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})



