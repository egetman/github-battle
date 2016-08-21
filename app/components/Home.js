var React = require('react');
var Link = require('react-router').Link;

var MainContainer = require('./MainContainer');

var Home = React.createClass({
    render: function () {
        return (
            <MainContainer>
                <h1>GitHub Battle</h1>
                <p className="lead">
                    Prepare To Fight!
                </p>
                <Link to="/playerOne">
                    <button className="btn btn-lg btn-success" type="button">
                        Get Started
                    </button>
                </Link>
            </MainContainer>
        );
    }
});

module.exports = Home;