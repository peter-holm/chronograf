import React, {PureComponent} from 'react'
import FuncArg from 'src/ifql/components/FuncArg'
import {OnChangeArg} from 'src/types/ifql'
import {ErrorHandling} from 'src/shared/decorators/errors'
import {Func} from 'src/types/ifql'

interface Props {
  func: Func
  bodyID: string
  onChangeArg: OnChangeArg
  declarationID: string
  onGenerateScript: () => void
}

@ErrorHandling
export default class FuncArgs extends PureComponent<Props> {
  public render() {
    const {
      func,
      bodyID,
      onChangeArg,
      declarationID,
      onGenerateScript,
    } = this.props

    return (
      <div className="func-args">
        {func.args.map(({key, value, type}) => {
          return (
            <FuncArg
              key={key}
              type={type}
              argKey={key}
              value={value}
              bodyID={bodyID}
              funcID={func.id}
              funcName={func.name}
              onChangeArg={onChangeArg}
              declarationID={declarationID}
              onGenerateScript={onGenerateScript}
            />
          )
        })}
      </div>
    )
  }
}
