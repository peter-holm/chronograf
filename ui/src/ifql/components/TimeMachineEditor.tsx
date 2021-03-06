import React, {PureComponent} from 'react'
import {Controlled as CodeMirror, IInstance} from 'react-codemirror2'
import {EditorChange} from 'codemirror'
import 'src/external/codemirror'
import {ErrorHandling} from 'src/shared/decorators/errors'
import {OnSubmitScript, OnChangeScript} from 'src/types/ifql'

interface Props {
  script: string
  onChangeScript: OnChangeScript
  onSubmitScript: OnSubmitScript
}

@ErrorHandling
class TimeMachineEditor extends PureComponent<Props> {
  constructor(props) {
    super(props)
  }

  public render() {
    const {script} = this.props

    const options = {
      lineNumbers: true,
      theme: 'material',
      tabIndex: 1,
      readonly: false,
    }

    return (
      <div className="time-machine-editor-container">
        <div className="time-machine-editor">
          <CodeMirror
            autoFocus={true}
            autoCursor={true}
            value={script}
            options={options}
            onBeforeChange={this.updateCode}
            onTouchStart={this.onTouchStart}
          />
        </div>
        <button
          className="btn btn-lg btn-primary"
          onClick={this.props.onSubmitScript}
        >
          Submit Script
        </button>
      </div>
    )
  }

  private onTouchStart = () => {}

  private updateCode = (
    _: IInstance,
    __: EditorChange,
    script: string
  ): void => {
    this.props.onChangeScript(script)
  }
}

export default TimeMachineEditor
