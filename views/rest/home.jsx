var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Home extends React.Component {
  render() {


    return (
      <html>
        <Head />
        <body>
            <div className="container">
                <Navbar username={this.props.username} error={this.props.error}/>
                <h1>Better Get Some Rest</h1>
                <Footer />
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;