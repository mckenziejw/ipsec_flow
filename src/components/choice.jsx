import React, { Component } from "react";

class Choice extends Component {
  doChoiceClick = () => {};

  render() {
    console.log(this.props);
    return (
      <div
        className="col-sm"
        style={{
          padding: "10px",
        }}
      >
        <div
          className="card text-center mx-auto"
          onClick={() => this.props.choiceClick(this.props.id)}
          style={{
            padding: "10px",
          }}
        >
          {this.props.diagram && (
            <img
              src={this.props.diagram}
              alt=""
              className="card-img-top mx-auto"
              style={{
                width: "400px",
                height: "400px",
              }}
            />
          )}
          <div className="card-body text-center">
            {this.props.title && <p classname="card-text">{this.props.text}</p>}
            {this.props.links && (
              <div
                className="card text-center mx-auto"
                style={{
                  width: "400px",
                  height: "400px",
                }}
              >
                <h4 className="card-title">Consult related documentation:</h4>
                <div className="card-body">
                  <ul className="list-group">
                    {this.props.links.map((link) => (
                      <li className="list-group-item" key={link.url}>
                        <a href={link.url}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Choice;
