var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")


class Act extends React.Component {
  render() {
        console.log("THIS IS IN THE JSX. sleepData:")
        console.log(this.props.sleepData)
        let sleepEle = this.props.sleepData.map(sleep => {
            let date = "" + sleep.sleepstart.getDate() + "/" + sleep.sleepstart.getMonth() + "/" + sleep.sleepstart.getFullYear();
            let duration = Math.ceil(parseInt(sleep.duration)/3600000);
            return (
                <div className="container bg-dark">
                    <label>Date :</label>
                    <span>{date}</span>
                    <p>Slept for {duration} Hours</p>
                    <p>Notes : {sleep.notes}</p>
                </div>
                )
        })
    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <h1>Better Get Some Rest</h1>
                {sleepEle}
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Act;