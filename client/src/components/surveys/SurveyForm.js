//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

import SurveyField from './SurveyField';


class SurveyForm extends Component {
   renderFields() {
     return _.map(formFields, ({label, name}) => {
        return <Field key={name} component={SurveyField} type="text" label={label} name={name}  />
     });
   }

   render() {
      return (
         <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
               {this.renderFields()}
               <Link to="/surveys" className="red btn flat white-text">Cancel</Link>
               <button className=" teal btn-flat right white-text" type="submit">Review Survey <i className="material-icons right">keyboard_arrow_right</i> </button>
            </form>
         </div>
      );
   }
}

function validate(values) {
   const errors = {};

   errors.recipients = validateEmails(values.recipients || '');

   _.each(formFields, ( { name, noValueError } ) => {
      if (!values[name]) {
         errors[name] = noValueError;
      }
   });


   return errors;
}

export default reduxForm({
   validate,
   form: 'surveyForm',
   destroyOnUnmount: false
}) (SurveyForm);