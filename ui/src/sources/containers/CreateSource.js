import React, {PropTypes} from 'react'
import {withRouter} from 'react-router'
import {createSource} from 'shared/apis'
import {connect} from 'react-redux'

import {insecureSkipVerifyText} from 'src/shared/copy/tooltipText'
import {addSource as addSourceAction} from 'src/shared/actions/sources'

export const CreateSource = React.createClass({
  propTypes: {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        redirectPath: PropTypes.string,
      }).isRequired,
    }).isRequired,
    addSourceAction: PropTypes.func,
  },

  getInitialState() {
    return {
      showSSL: false,
      showMeta: false,
    }
  },

  handleNewSource(e) {
    e.preventDefault()
    const source = {
      url: this.sourceURL.value.trim(),
      name: this.sourceName.value,
      username: this.sourceUser.value,
      password: this.sourcePassword.value,
      isDefault: true,
      telegraf: this.sourceTelegraf.value,
      insecureSkipVerify: this.sourceInsecureSkipVerify ? this.sourceInsecureSkipVerify.checked : false,
      metaUrl: this.metaUrl && this.metaUrl.value.trim(),
    }
    createSource(source).then(({data: sourceFromServer}) => {
      this.props.addSourceAction(sourceFromServer)
      this.redirectToApp(sourceFromServer)
    })
  },

  redirectToApp(source) {
    const {redirectPath} = this.props.location.query
    if (!redirectPath) {
      return this.props.router.push(`/sources/${source.id}/hosts`)
    }

    const fixedPath = redirectPath.replace(/\/sources\/[^/]*/, `/sources/${source.id}`)
    return this.props.router.push(fixedPath)
  },

  onInputChange() {
    const showSSL = !!this.sourceURL.value.startsWith("https")
    this.setState(showSSL)
  },

  render() {
    return (
      <div className="select-source-page" id="select-source-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="panel panel-minimal">
                <div className="panel-heading text-center">
                  <h2 className="deluxe">Welcome to Chronograf</h2>
                </div>
                <div className="panel-body">
                  <h4 className="text-center">Connect to a New Source</h4>
                  <br/>

                  <form onSubmit={this.handleNewSource}>
                    <div>
                      <div className="form-group col-xs-6 col-sm-4 col-sm-offset-2">
                        <label htmlFor="connect-string">Connection String</label>
                        <input ref={(r) => this.sourceURL = r} onChange={this.onInputChange} className="form-control" id="connect-string" defaultValue="http://localhost:8086"></input>
                      </div>
                      <div className="form-group col-xs-6 col-sm-4">
                        <label htmlFor="name">Name</label>
                        <input ref={(r) => this.sourceName = r} className="form-control" id="name" defaultValue="Influx 1"></input>
                      </div>
                      <div className="form-group col-xs-6 col-sm-4 col-sm-offset-2">
                        <label htmlFor="username">Username</label>
                        <input ref={(r) => this.sourceUser = r} className="form-control" id="username"></input>
                      </div>
                      <div className="form-group col-xs-6 col-sm-4">
                        <label htmlFor="password">Password</label>
                        <input ref={(r) => this.sourcePassword = r} className="form-control" id="password" type="password"></input>
                      </div>
                    </div>
                    <div className="form-group col-xs-8 col-xs-offset-2">
                      <label htmlFor="telegraf">Telegraf Database</label>
                      <input ref={(r) => this.sourceTelegraf = r} className="form-control" id="telegraf" type="text" defaultValue="telegraf"></input>
                    </div>
                    {this.state.showSSL ?
                      <div className="form-group col-xs-8 col-xs-offset-2">
                        <div className="form-control-static">
                          <input type="checkbox" id="insecureSkipVerifyCheckbox" ref={(r) => this.sourceInsecureSkipVerify = r} />
                          <label htmlFor="insecureSkipVerifyCheckbox">Unsafe SSL</label>
                        </div>
                        <label className="form-helper">{insecureSkipVerifyText}</label>
                      </div> : null}
                    <div className="form-group form-group-submit col-xs-12 text-center">
                      <button className="btn btn-success" type="submit">Connect New Source</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

function mapStateToProps(_) {
  return {}
}

export default connect(mapStateToProps, {addSourceAction})(withRouter(CreateSource))
