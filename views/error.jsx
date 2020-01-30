var React = require("react");
var Head = require("./head")
var Navbar = require("./navbar")

class ErrorPage extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>
            <div className="container">
                <Navbar />
                <h1>This is an Error Page</h1>
                <p>{this.props.error}</p>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = ErrorPage;