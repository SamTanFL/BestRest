var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class ActEdit extends React.Component {
  render() {

    let actData = this.props.actData;

    let act = {
        startDate : actData.start.getDate(),
        startMonth : actData.start.getMonth()+1,
        startYear: actData.start.getFullYear(),
        startHours: actData.start.getHours(),
        startMinutes: actData.start.getMinutes(),
    }

    if (act.startMonth < 10) {act.startMonth = "0" + act.startMonth}
    if (act.startDate < 10) {act.startDate = "0" + act.startDate}
    if (act.startHours < 10) {act.startHours = "0" + act.startHours}
    if (act.startMinutes < 10) {act.startMinutes = "0" + act.startMinutes}

    let defVal = {
        id: actData.id,
        name: actData.name,
        start: act.startYear + "-" + act.startMonth + "-" + act.startDate + "T" + act.startHours + ":" + act.startMinutes,
        notes: actData.notes
    }

    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Track Activity</h1>
                <form action="/activity?_method=put" method="POST" className="col-6">
                    <div className="form-group">
                        <input type="hidden" name="actid" value={defVal.id}/>
                        <input type="hidden" name="userId" value={this.props.userId}/>
                    </div>
                    <div className="form-group">
                        <label>Activity Name :</label>
                        <input type="text" className="form-control" placeholder="Name of Activity" defaultValue={defVal.name} name="name"/>
                    </div>
                    <div className="form-group">
                        <label>Start :</label>
                        <input type="datetime-local" className="form-control" defaultValue={defVal.start} name="start"/>
                        <small>If you can't remember exactly, just go with a rough estimate</small>
                    </div>
                    <div className="form-group">
                        <label>Sleep Hygiene :</label>
                        <input type="checkbox" className="form-check" name="benefit" defaultValue="true"/>
                        <small>Was the activity beneficial to your Sleep Hygiene</small>
                    </div>
                    <div className="form-group">
                        <label>Notes :</label>
                        <input type="text" className="form-control" placeholder="Anything of Notes" defaultValue={defVal.notes} name="notes"/>
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

module.exports = ActEdit;