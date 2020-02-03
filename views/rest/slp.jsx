var React = require("react");
var Head = require("../head")
var Navbar = require("../navbar")
var Footer = require("../footer")

class Slp extends React.Component {
  render() {


    return (
      <html>
        <Head />
        <body>
            <Navbar username={this.props.username}/>
            <div className="container">
                <div className="bg-secondary p-3">
                    <form>
                        <h3 className="text-light">Show Sleep From <span className="text-decoration-underline">Date 1</span> to <span className="text-decoration-underline">Date 2</span></h3>
                        <label>Date 1:</label>
                        <input type="date" name="date1" />
                        <label>Date 2:</label>
                        <input type="date" name="date2" />
                        <input type="hidden" name="userId" />
                        <div>
                            <button className="btn btn-primary" type="submit">Display</button>
                        </div>
                    </form>
                </div>
                    <form>

                        <input type="hidden" name="userId" />
                    </form>
                    <form>

                        <input type="hidden" name="userId" />
                    </form>
                    <form>

                        <input type="hidden" name="userId" />
                    </form>
            </div>
            <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Slp;