import React, { Component } from 'react'
import { mediaQueryMapper } from './mq'
import mapNodesToColumns from './mapNodesToColumns'
import styles from './styles.css'

class Columns extends Component{
  constructor(props) {
    super(props)
    this.setColumns = this.setColumns.bind(this)
    this.state = {}
  }

  setColumns() {
    this.setState({
      columns: this._columns.getValue()
    })
  }

  componentWillMount() {
    if (this.props.queries.length) {
      this._columns = mediaQueryMapper({
        queries: this.props.queries,
        valueKey: 'columns',
        defaultValue: this.props.queries.length ? 1 : this.props.columns,
        onChange: this.setColumns,
      })
      this.setColumns()
    }
  }

  componentWillUnmount() {
    if (this._columns) {
      this._columns.removeListeners()
    }
  }

  render() {
    const { className, children, dimensions, gap = 0 } = this.props
    const { columns = this.props.columns } = this.state

    console.log('render', this.props.columns, columns, this.state.columns)

    if (columns === 1) {
      return <div className={className}>{children}</div>
    }
    else {
      const columnsContainers = mapNodesToColumns({ children, columns, dimensions })
      return (
        <div className={className} style={{ columnCount: columns, columnGap: gap }}>
          {columnsContainers.map((column, i) => (
            <div key={i} className={styles.columnsColumn}>{column}</div>
          ))}
        </div>
      )
    }
  }
}

Columns.defaultProps = {
  queries: [],
  columns: 3
}

export default Columns