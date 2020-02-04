var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class UserSum extends React.Component {
  render() {


    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username} />
            <div className="container">
                <h1>Summary</h1>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = UserSum;