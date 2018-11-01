import React from 'react'
import { compose, withState, withHandlers, onlyUpdateForKeys, pure } from 'recompose'
import styled, { css } from 'styled-components'
import { FormConsumer } from "pages/context"


const FormView = (props) => (
  <form className={props.className}>
    {props.children}
  </form>
)

const Form = styled(FormView)`
  border: 1px solid #000;
`


const Label = (props) => <LabelWrapper>{props.children}</LabelWrapper>
const LabelWrapper = styled.div`
  width: 100px;
  background-color: aliceblue;
  border: 1px solid #ccc;
`


const InputView = ({ name, value, onChange: change }) => {
  const onChange = (event) => {
    const value = event.target.value

    change(value, name)
  }

  return (
    <input value={value || ''} onChange={(event) => onChange(event)} />
  )
}

const Input = onlyUpdateForKeys(['name', 'value'])(InputView)


const FormField = (props) => (
  <FormFieldWrapper>
    <Label>{props.label}</Label>
    <br />
    {props.children}
  </FormFieldWrapper>
)

const FormFieldWrapper = styled.div`
  border: 1px solid #000;
  background-color: azure;
  padding: 10px;

  // Make FormField component slower
  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};

  ${(props) => props.value && css`
    border-color: #f00;
  `};
`

class Fields extends React.Component {
  constructor(props) {
    super(props)
  }

  getFieldValue = (name) => {
    return this.props.getFieldValue(name)
  }

  setFieldValue = (value, name) => {
    this.props.setFieldValue(value)(name)
  }

  removeField = (name) => {
    this.props.removeField(name)
  }

  render() {
    return (
      <React.Fragment>
        {Object.entries(this.props.form).map((entry) => {
          const name = entry[0]
          const value = entry[1]

          return (
            <FormField label={name} key={name}>
              <React.Fragment>
                <Input
                  name={name}
                  value={this.getFieldValue(name)}
                  onChange={this.setFieldValue}
                  //onChange={(event) => props.setFieldValue(event)(`Name-${i}`)}
                />
                <button type="button" onClick={() => this.removeField(name)}>x</button>
              </React.Fragment>
            </FormField>
          )
        })}
      </React.Fragment>
    )
  }
}

// const Fields = (props) => (
//   <React.Fragment>
//     {Object.entries(props.form).map((entry) => {
//       const name = entry[0]
//       const value = entry[1]
//
//       return (
//         <FormField label={name} key={name}>
//           {(props) => (
//             <React.Fragment>
//               <Input
//                 name={name}
//                 value={props.getFieldValue(name)}
//                 onChange={this.setFieldValue}
//                 //onChange={(event) => props.setFieldValue(event)(`Name-${i}`)}
//               />
//               <button type="button" onClick={() => props.removeField(name)}>x</button>
//             </React.Fragment>
//           )}
//         </FormField>
//       )
//     })}
//   </React.Fragment>
// )

const enhance = compose(
  withState('form', 'setForm', () => (
    Array.from({ length: 300 }, (_, i) => ({ name: `Name-${i}`, value: '' })).reduce((data, current) => {

      return {
        ...data,
        [current.name]: current.value,
      }
    }, {})
  )),
  withHandlers({
    getFieldValue: (props) => (name) => {
      const { form } = props

      return form[name]
    },
    setFieldValue: (props) => (value) => (name) => {
      props.setForm((form) => ({
        ...form,
        [name]: value,
      }))
    },
  })
)

export const Form1 = enhance((props) => (
  <Form>
    <Fields {...props} />
  </Form>
))
