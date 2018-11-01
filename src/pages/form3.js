import React, { memo } from 'react'
import { compose, withState, withHandlers, onlyUpdateForKeys, pure } from 'recompose'
import styled, { css } from 'styled-components'
import { omit } from 'ramda'

import { Form, FormConsumer } from './context'


const LabelView = (props) => <label className={props.className}>{props.children}</label>

const Label = styled(LabelView)`
  width: 100px;
  background-color: aliceblue;
  border: 1px solid #ccc;
`


const InputView = (props) => {
  console.log('props: ', props)

  const { name, value, onChange: change } = props

  const onChange = (event) => {
    const data = event.target.value

    change(data, name)
  }

  console.log('render: ', value)

  return (
    <input name={name} value={value || ''} onChange={(event) => onChange(event)} />
  )
}

const Input = InputView

// const Input = onlyUpdateForKeys(['name', 'value'])(InputView)


const FormField = pure(({ label, children }) => (
  <FormFieldWrapper>
    <Label>{label}</Label>
    <br />
    <FormConsumer>
      {(props) => children(props)}
    </FormConsumer>
  </FormFieldWrapper>
))

const FormFieldWrapper = styled.div`
  border: 1px solid #000;
  background-color: azure;

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

class Fields extends React.PureComponent {
  static contextType = FormConsumer;

  getFieldValue = (name) => {
    return this.context.getFieldValue(name)
  }

  setFieldValue = (data, name) => {
    this.context.setFieldValue(data)(name)
  }

  removeField = (name) => {
    this.context.removeField(name)
  }

  render() {
    return (
      <React.Fragment>
        {Object.entries(this.context.form).map((entry) => {
          const name = entry[0]

          return (
            <FormField label={name} key={name}>
              {() => (
                <React.Fragment>
                  <Input
                    name={name}
                    value={this.getFieldValue(name)}
                    onChange={this.setFieldValue}
                    //onChange={(event) => props.setFieldValue(event)(`Name-${i}`)}
                  />
                  <button type="button" onClick={() => this.removeField(name)}>x</button>
                </React.Fragment>
              )}
            </FormField>
          )
        })}
      </React.Fragment>
    )
  }
}

// const Fields = pure(() => (
//   <React.Fragment>
//     {Array.from({ length: 300 }, (_, i) => (
//       <FormField label={`Name-${i}`} key={i}>
//         {(props) => (
//           <React.Fragment>
//             <Input
//               name={`Name-${i}`}
//               value={props.getFieldValue(`Name-${i}`)}
//               onChange={(event) => props.setFieldValue(`Name-${i}`)(event)}
//             />
//             <button type="button" onClick={() => this.removeField(name)}>x</button>
//           </React.Fragment>
//         )}
//       </FormField>
//     ))}
//   </React.Fragment>
// ))


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
    onSubmit: () => { console.log('onSubmit') },
    getFieldValue: (props) => (name) => {
      const { form } = props

      return form[name]
    },
    setFieldValue: (props) => (data) => (name) => {
      props.setForm((form) => ({
        ...form,
        [name]: data,
      }))
    },
    removeField: (props) => (name) => {
      props.setForm((form) => {
        return (omit([name], form))
      })
    },
  }),
  memo,
)

const ContentPage = pure((props) => (
  <Form
    form={props.form}
    getFieldValue={props.getFieldValue}
    setFieldValue={props.setFieldValue}
    removeField={props.removeField}
  >
    <Fields />
  </Form>
))

export const Form2 = enhance((props) => (
  <ContentPage {...props} />
))
