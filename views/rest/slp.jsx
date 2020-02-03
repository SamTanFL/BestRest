var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Slp extends React.Component {
  render() {


    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <form>

                </form>
                <form>

                </form>
                <form>

                </form>
                <form>

                </form>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Slp;