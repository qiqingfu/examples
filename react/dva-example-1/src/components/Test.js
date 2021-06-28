import React, { useEffect } from 'react'
import { connect } from "dva"

const Test = ({ dispatch, list }) => {
  useEffect(() => {
    dispatch({
      type: 'test/getList'
    })
  }, [])
  
  return (
    <div>
     {
       list.length ? <ul>
       {
         list.map(item => (<li key={item}>{item}</li>))
       }
     </ul>
        : <p>数据加载中...</p>
     }
    </div>
  )
}

const mapStateToProps = ({test}) => {
  return {
    list: test.list
  }
}

export default connect(mapStateToProps)(Test)
