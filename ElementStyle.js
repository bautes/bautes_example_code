/*
This component is part of an Element component wich can be of many types: Table, Line, ..., Container

The Container type can nest another Elements inside.
Due to that I had issues with the styles and this component updates the element styles by creating the CSS name based on the Element.id

*/

import React from "react";
import { connect } from "react-redux";
import { Style } from "react-style-tag";
import _flatten from 'lodash/flatten'
import _omit from 'lodash/omit'
import _pick from 'lodash/pick'
import _isEmpty from 'lodash/isEmpty'
import _fromPairs from 'lodash/fromPairs'

const objectToCSS = objStyle => {
  const stringStyles = objStyle ?
    Object.entries(objStyle)
    .sort()
    .map(([k, v]) => {
      const mapper = {
        'backgroundColor': 'background-color',
        'borderColor': 'border-color',
        'fontColor': 'color'
      }[k] || k;
      return [mapper, v].join(': ')
    })
    .join(';\n') :
    ''
    return stringStyles.length ? `${stringStyles};` : ''
}

const extractTableStyles = objStyle => {
  const tableSupportedStyles = [
    'border',
    'borderColor'
  ]
  return [_omit(objStyle, tableSupportedStyles), _pick(objStyle, tableSupportedStyles)]
}

//sepparates styles from table or element.
//Required to render the border on the table.
const splitStyles = (objStyle, type) => {
  return (type === 'table') ? extractTableStyles(objStyle) : [objStyle, {}]
}

export const recursiveParentId = (el, allElements) => {
  if (!el) return []
  if (!el.parentElementId) return [el.elementId]
  return [el.elementId, ...recursiveParentId(allElements.find(this_el => this_el.elementId === el.parentElementId), allElements)]
}

const getAllPaths = allElements => {
  return _fromPairs(allElements.map(el => [
    el.elementId,
    '.Element-' + recursiveParentId(el, allElements).reverse().join(' .Element-')
  ]))
}

const ElementStyle = ({allElements}) => {

  const allPaths = getAllPaths(allElements)

  const generateStyleForElement = ({elementId, width, height, top, left, style, header, type, parentElementId, fixed}, index) => {
    const [elemStyle, tableStyle] = splitStyles(style, type)
    let cssPath = allPaths[elementId] || ''

    const tableCSS = _isEmpty(tableStyle) ? '' : `
      ${cssPath} .TableElement table,
      ${cssPath} .TableElement td {
        ${objectToCSS(tableStyle)}
      }
    `
    const tableHeaderCSS = _isEmpty(header) ? '' : `
      ${cssPath} .TableElement table tr:first-child {
        ${objectToCSS(header)}
      }
    `

    return `
      ${cssPath} .Element-content {
        border: 1px dashed gray;
        background: none;
        position: absolute;
        width: ${width}px;
        height: ${height}px;
        /* z-index: ${(index + 1) * 10}; */
        ${objectToCSS(elemStyle)}
      }

      ${tableCSS}
      ${tableHeaderCSS}
    `
  }

  return allElements.map((elem, k) => <Style key={k}>{generateStyleForElement(elem, k)}</Style>)
}

const mapStateToProps = ({app, blueprints}) => {
  const blueprintId = app.selection.blueprint
  const allElements = _flatten(blueprints.byId[blueprintId].pages.map(p => p.elements))
    .concat(blueprints.byId[blueprintId].fixedElements)

  return {
    allElements
  }
}


export default connect(
  mapStateToProps
)(ElementStyle);
