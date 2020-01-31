var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class Act extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>
            <div className="container">
                <Navbar />
                <h1>Track Activity</h1>
                <form action="/activity" method="POST">
                    <div className="form-group">
                        <input type="hidden" name="userId" value={this.props.userId}/>
                    </div>
                    <div className="form-group">
                        <label>Activity Name :</label>
                        <input type="text" className="form-control" placeholder="Name of Activity" value="test" name="name"/>
                    </div>
                    <div className="form-group">
                        <label>Start :</label>
                        <input type="datetime-local" className="form-control" value="2020-01-01T00:00" name="start"/>
                        <small>If you can't remember exactly, just go with a rough estimate</small>
                    </div>
                    <div className="form-group">
                        <label>Sleep Hygiene :</label>
                        <input type="checkbox" className="form-check" name="benefit" value="true"/>
                        <small>Was the activity beneficial to your Sleep Hygiene</small>
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

module.exports = Act;