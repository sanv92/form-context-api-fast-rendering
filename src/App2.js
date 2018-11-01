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

  // shouldComponentUpdate(nextProps, nextState) {
  //   const prevProps = this.props
  //
  //   return prevProps.name !== nextProps.name || prevProps.value !== nextProps.value
  //
  //   // return false
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log('nextProps.value !== nextState.value: ', nextProps.value !== nextState.value)
  //   //
  //   // console.log('nextProps.value: ', nextProps)
  //   // console.log('nextState.value: ', nextState)
  //   // console.log('--------')
  //   // console.log('this.props: ', this.props)
  //
  //   // return false
  //
  //   // console.log('nextProps.value: ', nextProps)
  //   // console.log('nextState.value: ', nextState)
  //   //
  //   // // if (!nextProps) return false
  //   // if (!nextState) return true
  //   //
  //   // console.log('xxxx')
  //
  //   // return nextProps.value !== nextState.value
  // }

  onChange = (event) => {
    const value = event.target.value
    // console.log('value: ', value)
    // this.setState({ value: event.target.value })

    this.setState({ value }, () => this.props.onChange(value))
  }

  // componentDidUpdate() {
  //   console.log('shouldComponentUpdate: ', this.props.name)
  // }


  render() {
    console.log('render: ', this.props.name)

    return <input value={this.state.value} onChange={(event) => this.onChange(event)} />
  }
}

// const Input = pure(({ value, onChange }) => <input value={value} onChange={onChange} />)
// const InputMemo = pure(Input)

class Consumer extends React.Component {
  static contextType = FormContext;

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextProps: ', nextProps)
  //   console.log('nextState: ', nextState)
  //   return false
  // }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.context)}
      </React.Fragment>
    )

    // return (
    //   <FormContext.Consumer>
    //     {(props) => this.props.children(props)}
    //   </FormContext.Consumer>
    // )
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

// const FormField = ({ label, children }) => (
//   <React.Fragment>
//     <Label>{label}</Label>
//     <br />
//     <FormContext.Consumer>
//       {(props) => children(props)}
//     </FormContext.Consumer>
//   </React.Fragment>
// )

class Fields extends React.Component {
  // static contextType = FormContext
  //
  // onChange = (name) => {
  //   this.context.setFormValue(name, event)
  // }

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
        {/*<div>*/}
          {/*<FormField label="Name:">*/}
            {/*{(props) => {*/}
              {/*console.log('props: ', props)*/}

              {/*return (*/}
                {/*<Input name="name 1" value={props.getFormValue('name') || ''} onChange={(event) => props.setFormValue('name', event)} />*/}
              {/*)*/}
            {/*}}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 2:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 2" value={props.getFormValue('name2') || ''} onChange={(event) => props.setFormValue('name2', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 3:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 3" value={props.getFormValue('name3') || ''} onChange={(event) => props.setFormValue('name3', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}

        {/*<div>*/}
          {/*<FormField label="Name 4:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 4" value={props.getFormValue('name4') || ''} onChange={(event) => props.setFormValue('name4', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 5:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 5" value={props.getFormValue('name5') || ''} onChange={(event) => props.setFormValue('name5', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 6:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 6" value={props.getFormValue('name6') || ''} onChange={(event) => props.setFormValue('name6', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}

        {/*<div>*/}
          {/*<FormField label="Name 7:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 7" value={props.getFormValue('name7') || ''} onChange={(event) => props.setFormValue('name7', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 8:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 8" value={props.getFormValue('name8') || ''} onChange={(event) => props.setFormValue('name8', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<FormField label="Name 9:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 9" value={props.getFormValue('name9') || ''} onChange={(event) => props.setFormValue('name9', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}

        {/*<div>*/}
          {/*<FormField label="Name 10:">*/}
            {/*{(props) => (*/}
              {/*<Input name="name 10" value={props.getFormValue('name10') || ''} onChange={(event) => props.setFormValue('name10', event)} />*/}
            {/*)}*/}
          {/*</FormField>*/}
        {/*</div>*/}
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
