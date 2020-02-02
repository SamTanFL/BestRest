var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class Slp extends React.Component {
  render() {
    let endError = <small className="text-danger">{this.props.error}</small>
    return (
      <html>
        <Head />
        <body>
            <div className="container">
                <Navbar username={this.props.username}/>
                <h1>Track Sleep</h1>
                <form action="/sleep" method="POST">
                    <div className="form-group">
                        <input type="hidden" name="userId" value={this.props.userId}/>
                    </div>
                    <div className="form-group">
                        <label>Sleep Start :</label>
                        <p></p>
                        <input type="datetime-local" className="form-control" name="sleepstart" defaultValue="2020-01-01T00:00"/>
                        <small>If you can't remember exactly, just go with a rough estimate</small>
                    </div>
                    <div className="form-group">
                        <label>Sleep End :</label>
                        <p>{endError}</p>
                        <input type="datetime-local" className="form-control" name="sleepend" defaultValue="2020-01-01T12:00"/>
                    </div>
                    <div className="form-group">
                        <label>Comments :</label>
                        <p></p>
                        <input type="text" className="form-control" placeholder="Any additional notes you would like to make." name="notes"/>
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

module.exports = Slp;