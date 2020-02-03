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
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Register Account</h1>
                <form action="/users/new" method="POST">
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" name="username" required/>
                        <small className="text-danger">{this.props.nameError}</small>
                    </div>
                    <div className="form-group">
                        <label>Age :</label>
                        <input type="number" className="form-control" name="age" min="0" max="150" required/>
                        <small className="text-danger">{this.props.ageError}</small>
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" className="form-control" name="password"/>
                        <small className="text-danger">{this.props.passError}</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = User;