/*
This is just a dummy list but rendered in an external DOM node to solve z-index issues.
*/

import "./_DummyList.scss";

import React, { useState, useEffect, useRef } from "react"
import ReactPortal from '../ReactPortal'
import { useEnter, useUpDownArrows } from '../utils'

const DummyListItem = ({item, onClick}) => {
  return <li
    className="DummyListItem"
    onClick={() => onClick(item)}>{item.text}</li>
}

const DummyList = ({list, filter, onSelect, onClose, alignToNode}) => {

  const _ref = useRef(null)
  const [filteredList, setList] = useState(list)
  const [active, setActive] = useState(-1)
  const whenUp = () => {
    setActive((active - 1 + filteredList.length) % filteredList.length)
  }
  const whenDown = () => {
    setActive((active + 1) % filteredList.length)
  }
  const whenEnter = ev => {
    if (filteredList[active] || filteredList[0])
      onSelect(filteredList[active] || filteredList[0])
  }
  useUpDownArrows(whenUp, whenDown)
  useEnter(whenEnter, _ref.current)

  useEffect(() => {
    const newFilter = filter.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') // if you enter a "+" in the RegExp class, explodes
    const reg = new RegExp(newFilter, 'gi')
    setList(filter.length ? list.filter(s => reg.test(s.text)) : filteredList)
  }, [filter])

  useEffect(() => {
    if (active > -1 && _ref) {
      _ref.current.childNodes.forEach((c, i) => c.classList.toggle("DummyListItem--active", i === active))
    }
  }, [active])

  return (
    <ReactPortal onBlur={onClose} relativeTo={alignToNode}>
      <ul ref={_ref} className="DummyList">{
        filteredList.map((item, key) => <DummyListItem
          key={key}
          item={item}
          onClick={onSelect}
        />)
      }</ul>
    </ReactPortal>
  )
}

DummyList.defaultProps = {
  filter: ''
}

export default DummyList;
