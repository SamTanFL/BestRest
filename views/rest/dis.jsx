var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Slp extends React.Component {
  render() {

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    let dateToday = new Date().toDateInputValue();

    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
                <div className="bg-secondary p-3">
                    <div className="container">
                        <form action="/sleep/display">
                            <h3 className="text-light">Show Sleep From <span className="text-decoration-underline">Date 1</span> to <span className="text-decoration-underline">Date 2</span></h3>
                            <label>Date 1:</label>
                            <input type="date" name="date1" />
                            <label>Date 2:</label>
                            <input type="date" name="date2" defaultValue={dateToday} />
                            <input type="hidden" name="userId" value={this.props.userId} />
                            <div>
                                <button className="btn btn-primary" type="submit">Display</button>
                                <span><small className="text-danger">{this.props.error1}</small></span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bg-blue p-3">
                    <div className="container">
                        <form action="/activity/display">
                            <h3 className="text-light">Show Activity From <span className="text-decoration-underline">Date 1</span> to <span className="text-decoration-underline">Date 2</span></h3>
                            <label>Date 1:</label>
                            <input type="date" name="date1" />
                            <label>Date 2:</label>
                            <input type="date" name="date2" defaultValue={dateToday} />
                            <input type="hidden" name="userId" value={this.props.userId} />
                            <div>
                                <button className="btn btn-primary" type="submit">Display</button>
                                <span><small className="text-danger">{this.props.error2}</small></span>
                            </div>
                        </form>
                    </div>
                </div>
{/*                <div className="bg-secondary p-3">
                    <div className="container">
                        <form action="/all/display">
                            <h3 className="text-light">Show Sleep & Activity From <span className="text-decoration-underline">Date 1</span> to <span className="text-decoration-underline">Date 2</span></h3>
                            <label>Date 1:</label>
                            <input type="date" name="date1" />
                            <label>Date 2:</label>
                            <input type="date" name="date2" defaultValue={dateToday} />
                            <input type="hidden" name="userId" value={this.props.userId} />
                            <div>
                                <button className="btn btn-primary" type="submit">Display</button>
                            </div>
                        </form>
                    </div>
                </div>*/}
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Slp;