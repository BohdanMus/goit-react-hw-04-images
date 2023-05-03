import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Field, Form, Header, Btn } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

const FormSchema = Yup.object().shape({
  keyword: Yup.string().required('Required field!'),
});

export class Searchbar extends Component {
  render() {
    return (
      <Header>
        <Formik
          initialValues={{
            keyword: '',
          }}
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            this.props.onSubmit({ ...values });
            actions.resetForm();
          }}
        >
          <Form>
            <Btn type="submit">
              <BiSearch size="20" />
            </Btn>

            <Field name="keyword" placeholder="Search images and photos" />
          </Form>
        </Formik>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
