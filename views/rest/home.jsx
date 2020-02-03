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
                <div className="homeMsg">
                    <h1 className="text-center p-5">Better Get Some Rest</h1>
                    <p className="text-center pt-5">Sleep plays an important factor in one's life.</p>
                    <p className="text-center">Get better sleep. Get a better life</p>
                </div>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Home;