var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class Slp extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>
            <Navbar />
            <h1>Track Sleep</h1>
            <form action="/sleep" method="POST">
                <div className="form-group">
                    <label>Start Date :</label>
                    <input type="date" className="form-control" placeholder="dd/mm/yy" name="sleepDate"/>
                </div>
                <div className="form-group">
                    <input type="hidden" name="userId" value={this.props.userId}/>
                </div>
                <div className="form-group">
                    <label>Start :</label>
                    <input type="time" className="form-control" name="start"/>
                    <small>If you can't remember exactly, just go with a rough estimate</small>
                </div>
                <div className="form-group">
                    <label>End :</label>
                    <input type="time" className="form-control" name="wake"/>
                </div>
                <div className="form-group">
                    <label>Comments :</label>
                    <input type="text" className="form-control" placeholder="Any additional notes you would like to make." name="notes"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Slp;