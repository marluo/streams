import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    //props.error, props.touched
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    //Field passar in argument in som vi kan använda
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
    //formProps.label
    //formProps.input... whatever destructering
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        class="ui form error"
      >
        {/*vi använder onSubmit som är en prop av forms, och passar in vår submitfunktion*/}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/* redux field vet inte om vi visar en input, dropdown osv så vi måste ha en helper function för det */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button classname="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  //körs varje gång state uppdateras med en form action
  //om du returnerar ett objekt med något så tror form redux att det är en error, sparas som error i props.error
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title!";
  }
  if (!formValues.description) {
    errors.description = "You must enter a desc";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
