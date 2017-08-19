import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import styles from '../styles/app.css';


export default class App extends Component {
  render() {
    const { VATs, fieldtext, file, loading } = this.props.pdf;

    return (
      <div className={styles.container}>
        <input 
            type="text" 
            className={styles.field}
            value={fieldtext} 
            onChange={(e) => this.props.onChange(e.target.value)} 
            placeholder="VAT to exclude"
        />

        <Dropzone className={styles.dropzone} onDrop={(files) => this.props.fileDrop(files[0])}>
            <p className={styles.dropzoneLabel}> Drag and drop files </p>
            {(file) ?
                <p className={styles.filename}>{this.props.pdf.file.name}</p>
            : false}
        </Dropzone>

        {loading ?
            <p>...Files are uploaded and analysed...</p>
        : false}

        {(VATs && VATs.length === 0)?
            <p>No VAT found on this file</p>
        : false}

        {(VATs && VATs.length > 0) ?
                <div className={styles.vat}>
                    <p>VAT Found</p>
                    {VATs.map((v) => {
                        return <p key={v}>{v}</p>
                    })}
                </div>
        : false}

      </div>
    );
  }
}
