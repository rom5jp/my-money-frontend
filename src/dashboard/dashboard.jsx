import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

class Dashboard extends Component {
render() {
  const { credit, debt } = this.props.summary

  return (
      <div>
        <ContentHeader title='Dashboard' small='Beta Version' />

        <Content>
        <Row>
          <ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit}`} text='Total Credits' />
          <ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt}`} text='Total Debts' />
          <ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${credit - debt}`} text='Balance' />
        </Row>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({summary: state.dashboard.summary})
export default connect(mapStateToProps)(Dashboard)