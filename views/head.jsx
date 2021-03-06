var React = require("react");


class Head extends React.Component {
  render() {
    return (
        <head>
            <title>Best Rest</title>
            <meta charSet="utf-8"/>
            <link rel="stylesheet" href="/style.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
    );
  }
}

module.exports = Head;