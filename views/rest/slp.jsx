var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")


class Act extends React.Component {
  render() {
        let sleepEle = this.props.sleepData.map(sleep => {
            let date = "" + sleep.sleepstart.getDate() + "/" + (sleep.sleepstart.getMonth()+1) + "/" + sleep.sleepstart.getFullYear();
            let duration = Math.ceil(parseInt(sleep.duration)/3600000);
            let slpMax = 8;
            let percentage = Math.ceil((duration/slpMax)*100) > 100 ? '100%' : Math.ceil((duration/slpMax)*100) + '%'
            console.log(percentage)
            return (
                <div className="container bg-dark col-6">
                    <label>Date :</label>
                    <span>{date}</span>
                    <p>Slept for {duration} Hours</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{width: percentage}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{duration}</div>
                    </div>
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