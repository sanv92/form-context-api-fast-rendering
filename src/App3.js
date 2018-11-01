import React, { createContext, memo } from 'react'
import ReactDOM from 'react-dom';
import { pure } from 'recompose'

import { FormContext, Form } from './context'


const Label = (props) => <label style={{ width: '100px '}}>{props.children}</label>

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prevProps = this.props;

    return (
      prevProps.name !== nextProps.name || prevProps.value !== nextProps.value
    );
  }

  onChange = (event) => {
    const value = event.target.value

    this.setState({ value }, () => this.props.onChange(value))
  }

  render() {
    console.log('render: ', this.props.name)

    return <input value={this.state.value} onChange={(event) => this.onChange(event)} />
  }
}

class Consumer extends React.Component {
  static contextType = FormContext;

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <FormContext.Consumer>
        {(props) => this.props.children(props)}
      </FormContext.Consumer>
    )
  }
}

class FormField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <React.Fragment>
        <Label>{this.props.label}</Label>
        <br />
        <Consumer children={this.props.children} />
      </React.Fragment>
    )
  }
}

class Fields extends React.Component {
  render() {
    return (
      <React.Fragment>
        {Array.from({ length: 500 }, (_, i) => (
          <div>
            <FormField label={`Name-${i}`}>
              {(props) => {
                return (
                  <Input name={`Name-${i}`} value={props.getFormValue(`Name-${i}`) || ''} onChange={(event) => props.setFormValue(`Name-${i}`, event)} />
                )
              }}
            </FormField>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Form>
        <Fields />
      </Form>
    );
  }
}
