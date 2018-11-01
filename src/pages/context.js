import React, { memo } from 'react'
import { compose, withState, withHandlers, onlyUpdateForKeys, pure } from 'recompose'
import styled, { css } from 'styled-components'


const FormView = styled((props) => (
  <form className={props.className} onSubmit={props.onSubmit}>
    {props.children}
  </form>
))`
  border: 1px solid #000;
`

const FormView2 = memo(FormView)


export const FormContext = React.createContext();
export const FormConsumer = FormContext.Consumer

export const Form = React.memo((props) => (
  <FormContext.Provider value={{
    form: props.form,
    getFieldValue: props.getFieldValue,
    setFieldValue: props.setFieldValue,
    removeField: props.removeField,
  }}>
    <FormView2 onSubmit={props.onSubmit}>
      {props.children}
    </FormView2>
  </FormContext.Provider>
))

// export class FormX extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       form: {},
//     }
//   }
//
//   onSubmit = (event) => {
//     event.preventDefault();
//
//     console.log('form: ', this.state)
//   }
//
//   getFormValue = (name) => {
//     return this.state.form[name]
//   }
//
//   setFormValue = (name, value) => {
//     this.setState({
//       form: {
//         ...this.state.form,
//         [name]: value,
//       }})
//   }
//
//   render() {
//     return (
//       <FormContext.Provider value={{
//         getFormValue: this.getFormValue,
//         setFormValue: this.setFormValue,
//       }}>
//         <FormView onSubmit={this.onSubmit}>
//           {this.props.children}
//         </FormView>
//       </FormContext.Provider>
//     )
//   }
// }
