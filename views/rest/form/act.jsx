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
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Track Activity</h1>
                <form action="/activity" method="POST" className="col-6">
                    <div className="form-group">
                        <input type="hidden" name="userId" value={this.props.userId}/>
                    </div>
                    <div className="form-group">
                        <label>Activity Name :</label>
                        <input type="text" className="form-control" placeholder="Name of Activity" defaultValue="test" name="name"/>
                    </div>
                    <div className="form-group">
                        <label>Start :</label>
                        <input type="datetime-local" className="form-control" defaultValue="2020-01-01T00:00" name="start"/>
                        <small>If you can't remember exactly, just go with a rough estimate</small>
                    </div>
                    <div className="form-group">
                        <label>Sleep Hygiene :</label>
                        <input type="checkbox" className="form-check" name="benefit" defaultValue="true"/>
                        <small>Was the activity beneficial to your Sleep Hygiene</small>
                    </div>
                    <div className="form-group">
                        <label>Notes :</label>
                        <input type="text" className="form-control" placeholder="Anything of Notes" name="notes" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Act;