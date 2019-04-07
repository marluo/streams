import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    console.log(this.props.match.params.id);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    console.log(this.props.stream);
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          //Den kollar om någon Field har dessa och passar in dem i dessa i Formen. Då kommer värden på form.
          // {title:"title" description:"desc" så ser det ut. Då kommer alltså Fieldsen, input om de har samma namn ha dessa värden}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //vi kallar in ownProps från ovan (props) för att hitta streamen vi försöker editera.
  console.log("kekeee", state);

  return {
    stream: state.streams[ownProps.match.params.id]
    //ownprops för att det är en egen prop. Vi kommer åt streamen nu från URLn med idt
  };
};

export default connect(
  mapStateToProps,
  {
    fetchStream,
    editStream
  }
)(StreamEdit);
