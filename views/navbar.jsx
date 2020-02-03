var React = require('react');

class Navbar extends React.Component {
    render() {
        let loginOut
        let accStuff
        if (this.props.username) {
            loginOut = <div><span className="mr-sm-2">Logged in as {this.props.username}.</span><form className="form-inline my-2 my-lg-0" action="/users/logout?_method=delete" method="POST"><button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button></form></div>;
            accStuff = <a className="dropdown-item text-light" href="/users">My Account</a>
        } else {
            loginOut = <div><span><small className="text-danger">{this.props.error}</small></span><form className="form-inline my-2 my-lg-0" method="POST" action="/"><input className="form-control mr-sm-2 bg-dark" type="text" placeholder="Username" aria-label="User" name="username"/><input className="form-control mr-sm-2 bg-dark" type="text" placeholder="Password" aria-label="Password" name="password"/><button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Log In</button></form></div>;
            accStuff = <a className="dropdown-item text-light" href="/users/new">Register Account</a>
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container">
                    <a href="/" className="navbar-brand">The Best Rest</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tracker</a>
                            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item text-light" href="/sleep/new">Add Sleep</a>
                              <a className="dropdown-item text-light" href="/activity/new">Add Activity</a>
                              <a className="dropdown-item text-light" href="/display">Display Data</a>
                            </div>
                        </div>
                        <div className="nav-item dropdown mr-auto">
                            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
                            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                {accStuff}
                            </div>
                        </div>
                        {loginOut}
                    </div>
                </div>
            </nav>
        );
    }
}

module.exports = Navbar;