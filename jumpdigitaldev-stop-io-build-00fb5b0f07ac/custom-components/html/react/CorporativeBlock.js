import React, { Component } from 'react'
import styles from './styles.css';
import ReactResizeDetector from 'react-resize-detector';



export default class CorporativeBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vermas: true,
        };
    }

    checkMenos = () => {
        this.setState({ vermas: true })
    }

    checkMas = () => {
        this.setState({ vermas: false });   
    }

    render() {
        const { shortText } = this.props;
        const { largeText } = this.props;
        const { textMobile } = this.props;
        const { textMobileCorto } = this.props;
        const { titleSection } = this.props;
        const { vermas } = this.state;
        const { textSeeMore } = this.props;
        const { textSeeLess } = this.props;
        const { sectionBlocks } = this.props;
        return (
            <ReactResizeDetector handleWidth>

                {width => {
                    const mobileMode = width.width < 768 || (global.__RUNTIME__.hints.mobile && (!width || width < 768))

                    if (!mobileMode) {
                        return (
                            <div className={styles.itemBlock}>
                                <h3 className={styles.titleBlock}>{titleSection}</h3>
                                {vermas ? (
                                    <div>
                                        <span dangerouslySetInnerHTML={{ __html: shortText }} />
                                        <div className={styles.blockButton}>
                                            <div onClick={(e) => this.checkMas()} className={styles.buttonMoreLess}>
                                                {largeText != '' ? (<span> {textSeeMore} <img src="/arquivos/downarrow.png"></img></span>) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <span dangerouslySetInnerHTML={{ __html: largeText }} />
                                        <div className={styles.blockButton}>
                                            <div onClick={(e) => this.checkMenos()} id="desplegableAbierto" className={styles.buttonMoreLess}>
                                                <span> {textSeeLess} <img src="/arquivos/uparrow.png"></img>  </span>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles.itemBlock}>
                                <h3 className={styles.titleBlock}>{titleSection}</h3>
                                {vermas ? (
                                    <div>
                                        <span dangerouslySetInnerHTML={{ __html: textMobileCorto }} />
                                        <div className={styles.blockButton}>
                                            <div onClick={(e) => this.checkMas()} className={styles.buttonMoreLess}>
                                                {textMobile != '' ? (<span> {textSeeMore} <img src="/arquivos/downarrow.png"></img> </span>) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <span dangerouslySetInnerHTML={{ __html: textMobile }} />
                                        <div className={styles.blockButton}>
                                            <div onClick={(e) => this.checkMenos()} className={styles.buttonMoreLess}>
                                                <span> {textSeeLess} <img src="/arquivos/uparrow.png"></img>  </span>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        )
                    }
                }}
            </ReactResizeDetector>
        )
    }
}