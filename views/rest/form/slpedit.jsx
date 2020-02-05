var React = require("react");
var Head = require("../../head")
var Navbar = require("../../navbar")
var Footer = require("../../footer")

class SlpEdit extends React.Component {
  render() {
    let slpDetails = this.props.slpDetails
    let slp = {
        startDate : slpDetails.sleepstart.getDate(),
        startMonth : slpDetails.sleepstart.getMonth()+1,
        startYear: slpDetails.sleepstart.getFullYear(),
        startHours: slpDetails.sleepstart.getHours(),
        startMinutes: slpDetails.sleepstart.getMinutes(),
        endDate: slpDetails.sleepend.getDate(),
        endMonth: slpDetails.sleepend.getMonth()+1,
        endYear: slpDetails.sleepend.getFullYear(),
        endHours: slpDetails.sleepend.getHours(),
        endMinutes: slpDetails.sleepend.getMinutes()
    }
    if (slp.startMonth < 10) {slp.startMonth = "0" + slp.startMonth}
    if (slp.startDate < 10) {slp.startDate = "0" + slp.startDate}
    if (slp.startHours < 10) {slp.startHours = "0" + slp.startHours}
    if (slp.startMinutes < 10) {slp.startMinutes = "0" + slp.startMinutes}
    if (slp.endMonth < 10) {slp.endMonth = "0" + slp.endMonth}
    if (slp.endDate < 10) {slp.endDate = "0" + slp.endDate}
    if (slp.endHours < 10) {slp.endHours = "0" + slp.endHours}
    if (slp.endMinutes < 10) {slp.endMinutes = "0" + slp.endMinutes}

    let start = slp.startYear + "-" + slp.startMonth + "-" + slp.startDate + "T" + slp.startHours + ":" + slp.startMinutes
    let end = slp.endYear + "-" + slp.endMonth + "-" + slp.endDate + "T" + slp.endHours + ":" + slp.endMinutes

    let defVal = {
        start,
        end,
        notes: this.props.slpDetails.notes
    }

    let endError = <small className="text-danger">{this.props.error}</small>

    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Track Sleep</h1>
                <p>{endError}</p>
                <form action="/sleep?_method=put" method="POST" className="col-6">
                    <div className="form-group">
                        <input type="hidden" name="userId" value={this.props.userId} />
                        <input type="hidden" name="slpid" value={this.props.slpDetails.id} />
                    </div>
                    <div className="form-group">
                        <label>Sleep Start :</label>
                        <p></p>
                        <input type="datetime-local" className="form-control" name="sleepstart" defaultValue={defVal.start}/>
                        <small>If you can't remember exactly, just go with a rough estimate</small>
                    </div>
                    <div className="form-group">
                        <label>Sleep End :</label>

                        <input type="datetime-local" className="form-control" name="sleepend" defaultValue={defVal.end}/>
                    </div>
                    <div className="form-group">
                        <label>Comments :</label>
                        <p></p>
                        <input type="text" className="form-control" placeholder="Any additional notes you would like to make." name="notes" defaultValue={defVal.notes} />
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

module.exports = SlpEdit;