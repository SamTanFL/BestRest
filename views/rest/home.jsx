var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")

class Home extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>
            <Navbar />
            <h1>Better Get Some Rest</h1>
        </body>
      </html>
    );
  }
}

module.exports = Home;