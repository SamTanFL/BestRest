var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class User extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>
            <div className="container">
                <Navbar username={this.props.username}/>
                <h1>Register Account</h1>
                <form action="/users/new" method="POST">
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" name="username" required/>
                        <small className="text-danger">{this.props.nameError}</small>
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" className="form-control" name="password"/>
                        <small className="text-danger">{this.props.passError}</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Footer />
            </div>
        </body>
      </html>
    );
  }
}

module.exports = User;