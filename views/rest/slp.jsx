var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Act extends React.Component {
  render() {
    console.log("THIS IS IN THE JSX. sleepData:")
    console.log(this.props.sleepData)

    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Better Get Some Rest</h1>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Act;