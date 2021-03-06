import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from '../billingCycle/billingCycleActions'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends React.Component {
  calculateSummary() {
    const sum = (t, v) => t + v

    return {
      sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
      sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
    }
  }

  render() {
    const { handleSubmit, readOnly, credits } = this.props
    const { sumOfCredits, sumOfDebts } = this.calculateSummary()

    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>
          <Field name='name' label='Name' component={LabelAndInput} cols='12 4' placeholder='Insert the name here' readOnly={readOnly} />
          <Field name='month' label='Month' component={LabelAndInput} cols='12 4' placeholder='Which month?' readOnly={readOnly} />
          <Field name='year' label='Year' component={LabelAndInput} cols='12 4' placeholder='Which year?' readOnly={readOnly} />
          <Summary credit={sumOfCredits} debt={sumOfDebts}></Summary>
          <ItemList cols='12 12 12 6' readOnly={readOnly} list={credits} field='credits' legend='Credits' showStatus={true} />
          <ItemList cols='12 12 12 6' readOnly={readOnly} list={credits} field='debts' legend='Debts' showStatus={true} />
        </div>

        <div className='box-footer'>
          <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
          <button type='button' className='btn btn-default' onClick={this.props.init}>Cancel</button>
        </div>
      </form>
    )
  }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({
  credits: selector(state, 'credits'),
  debts: selector(state, 'debts'),
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)