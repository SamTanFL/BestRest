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
            <Navbar username={this.props.username} error={this.props.error}/>
            <div className="container">
                <h1>Better Get Some Rest</h1>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Home;