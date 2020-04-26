import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import If from '../operators/if'
import { selectTab } from './tabActions'

class TabHeader extends Component {
  render() {
    const isTabSelected = this.props.tab.selected === this.props.target
    const isVisible = this.props.tab.visible[this.props.target]

    return (
      <If test={isVisible}>
        <li className={isTabSelected ? 'active' : ''}>
          <a
            href='javascript:;'
            data-toggle='tab'
            data-target={this.props.target}
            onClick={() => this.props.selectTab(this.props.target)}
          >
            <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
          </a>
        </li>
      </If>
    )
  }
}

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)