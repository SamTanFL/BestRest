var React = require('react');

class Navbar extends React.Component {
    render() {
        let loginOut
        if (this.props.username) {
            loginOut = <div><span>Logged in as {this.props.username}.</span><form action="/users/logout?_method=delete" method="POST"><button className="btn-danger">Logout</button></form></div>
        } else {
            loginOut = <div><form className="form-inline my-2 my-lg-0" method="POST" action="/"><input className="form-control mr-sm-2" type="text" placeholder="Username" aria-label="User" name="username"/><input className="form-control mr-sm-2" type="text" placeholder="Password" aria-label="Password" name="password"/><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button></form></div>
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">The Best Rest</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/sleep/new">Add Sleep</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/users/new">Register Acc</a>
                        </li>
                    </ul>
                    {loginOut}
                  </div>
            </nav>
        );
    }
}

module.exports = Navbar;