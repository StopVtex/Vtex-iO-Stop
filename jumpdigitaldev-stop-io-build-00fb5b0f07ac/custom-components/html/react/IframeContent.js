import React, { Component } from 'react';
import CorporativeBlock from './CorporativeBlock';
import { Grid, Row } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import ReactResizeDetector from 'react-resize-detector';


export default class CorporativeApp extends Component {
  static defaultProps = {
    sectionBlocks: [],
  }

  static uiSchema = {
    text: {
      items: {
        text: {
          "ui:widget": "textarea"
        },
        image: {
          'ui:widget': 'image-uploader',
        },
      },
    },
  }

  static getSchema = (props) => {
    return {
      properties: {
        sectionBlocks: {
          items: {
            properties: {
              titleSection: {
                title: 'Section title',
                type: 'string',
                default: 'Título de la sección'
              },
              largeText: {
                title: 'Texto largo',
                type: 'string',
                widget: {
                  "ui:widget": "textarea"
                },
                default: 'Texto por defecto'
              },
              textMobile: {
                title: 'Texto para Mobile',
                type: 'string',
                widget: {
                  "ui:widget": "textarea"
                },
                default: 'Texto por defecto'
              }
            },
            title: 'Section',
            type: 'object',
          },
          minItems: 1,
          title: 'Iframe content',
          type: 'array',
        }
      },
      title: 'Iframe content',
      type: 'object',
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      vermas: true,
      expandedElement: 999
    };
  }

  testExpanded(indice) {
    this.setState({ expandedElement: indice });
  }

  render() {
    const { pageTitle, iconTitle, sectionBlocks } = this.props;
    const { vermas, expandedElement } = this.state;
    // const { shortText } = this.props;
    // const { largeText } = this.props;
    // const { textMobile } = this.props;
    // const { textMobileCorto } = this.props;
    // const { titleSection } = this.props;
    // const { vermas } = this.state;
    // const { textSeeMore } = this.props;
    // const { textSeeLess } = this.props;

    return (
      <div className="wrapper">
        <div className={styles.bodyBlock}>
          {sectionBlocks.map((b, i) =>
            <ReactResizeDetector key={i} handleWidth>

              {width => {
                const mobileMode = width.width < 1023 || (global.__RUNTIME__.hints.mobile && (!width || width < 1023))

                if (!mobileMode) {
                  return (
                    <div className={styles.itemBlockIframe}>
                      <h3 className={styles.titleBlock}>{b.titleSection}</h3>

                        <div>
                          <span dangerouslySetInnerHTML={{ __html: b.largeText }} />
                        </div>


                    </div>
                  )
                } else {
                  return (
                    <div className={styles.itemBlockIframe}>
                      <h3 className={styles.titleBlock}>{b.titleSection}</h3>
                      
                        <div>
                          <span dangerouslySetInnerHTML={{ __html: b.textMobile }} />
                        </div>

                    </div>
                  )
                }
              }}
            </ReactResizeDetector>


          )}
        </div>
      </div>
    )
  }
}