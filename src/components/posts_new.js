import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component{
  renderField(field){
    const { meta :{touched, error} } =field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label> {field.label} </label>
        <input {...field.input}
          className="form-control"
          type = "text"
        />
        <div className="text-help">
        {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    //this == component
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }


  render(){
    const  {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to = "/" className="btn btn-danger"> Cancel </Link>
      </form>
    );
  }
}


function validate(values){
  const errors ={};
  //validate input values

  if(!values.title){
    errors.title = "Enter the Title!"
  }
  if(!values.categories){
    errors.categories = "Mention the Categories"
  }
  if(!values.content){
    errors.content = "Description needed"
  }
  //If errors is empty then form is ready to submit
  //If error has any properties, redux assumes the form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
