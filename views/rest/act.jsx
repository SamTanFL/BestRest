var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Act extends React.Component {
  render() {
        console.log("THIS IS IN THE JSX. actData:")
        console.log(this.props.actData)
        let actEle = this.props.actData.map(act => {
            let date = "" + act.start.getDate() + "/" + (act.start.getMonth()+1) + "/" + act.start.getFullYear();
            return (
                <div className="container bg-dark">
                    <p>
                        <label>Activity:</label>
                        <span>{act.name}</span>
                    </p>
                    <p>
                        <label>Date :</label>
                        <span>{date}</span>
                    </p>
                    <p>Notes : {act.notes}</p>
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