const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const {
    DATABASE_URL,
    PORT
} = require('./config');
const {
    Reflection
} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));


//retrieve all reflections from the database
app.get('/reflections', (req, res) => {
    Reflection
        .find()
        .then(reflections => {
            res.json(reflections);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        })
});

//retrieve reflection by id
app.get('/reflections/:id', (req, res) => {
    Reflection
        .findById(req.params.id)
        .then(reflections => res.json(reflections))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {
    runServer,
    app,
    closeServer
};
