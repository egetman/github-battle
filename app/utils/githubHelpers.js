var axios = require('axios');

function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username);
}

function getUserRepositories(username) {
    //Fetch user repositories information from GitHub
    return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getTotalStars(repositories) {
    //Calculate all user stars
    return repositories.data.reduce(function (prev, current) {
        return prev + current.stargazers_count;
    }, 0);
}

function getUserData(player) {
    //Get Repos -> Calculate Stars -> Return Filled Object
    return getUserRepositories(player.login)
        .then(getTotalStars)
        .then(function (totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        });
}

function calculateScores(players) {
    //Return score of players
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function (players) {
        //Fetch data from GitHub
        return axios.all(players.map(function (username) {
            return getUserInfo(username)
        })).then(function (info) {
            return info.map(function (user) {
                return user.data;
            })
        }).catch(function (err) {
            console.warn('Error in getPlayersInfo: ', err);
        });
    },

    battle: function (players) {
        var playerOneData = getUserData(players[0]);
        var playerTwoData = getUserData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function (err) {
                console.warn("Error during calculating players scores: ", err);
            });
    }
};

module.exports = helpers;