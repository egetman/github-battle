var React = require('react');
var Link = require('react-router').Link;
var PropTypes = React.PropTypes;

var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var MainContainer = require('./MainContainer');
var Loading = require('./Loading');
var styles = require('../styles/style');

function StartOver(props) {
    return (
        <div className="col-sm-12" style={styles.space}>
            <Link to="/playerOne">
                <button type="button" className="btn btn-lg btn-danger">Start Over</button>
            </Link>
        </div>
    );
}

function Result(props) {
    if (props.isLoading) {
        return (
            <Loading/>
        );
    }

    if (props.scores[0] === props.scores[1]) {
        return (
            <MainContainer>
                <h1>It's a tie!</h1>
                <StartOver/>
            </MainContainer>
        );
    }

    var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
    var loserIndex = winningIndex ? 0 : 1;

    return (
        <MainContainer>
            <h1>Result</h1>
            <div className="col-sm-8 col-sm-offset-2">
                <UserDetailsWrapper header="Winner">
                    <UserDetails score={props.scores[winningIndex]} info={props.playersInfo[winningIndex]}/>
                </UserDetailsWrapper>
                <UserDetailsWrapper header="Loser">
                    <UserDetails score={props.scores[loserIndex]} info={props.playersInfo[loserIndex]}/>
                </UserDetailsWrapper>
            </div>
            <StartOver/>
        </MainContainer>
    );
}

Result.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired
};

module.exports = Result;