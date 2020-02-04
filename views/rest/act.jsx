var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Act extends React.Component {
  render() {
        let actEle = this.props.actData.map(act => {
            let date = "" + act.start.getDate() + "/" + (act.start.getMonth()+1) + "/" + act.start.getFullYear();
            return (
                <div className="container bg-dark col-6">
                    <form action="/activity?_method=delete" method="POST">
                        <button className="button bg-danger">Delete</button>
                        <input type="hidden" name="actid" value={act.id}/>
                    </form>
                    <form action="/activity/edit">
                        <button className="button bg-secondary">Edit</button>
                        <input type="hidden" name="actid" value={act.id}/>
                    </form>
                    <p>
                        <label>Activity:</label>
                        <span>{act.name}</span>
                    </p>
                    <p>
                        <label>Date :</label>
                        <span>{date}</span>
                    </p>
                    <p className="pb-5 pt-1">Notes : {act.notes}</p>
                </div>
                )
        })
    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>List of Activities</h1>
                {actEle}
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Act;