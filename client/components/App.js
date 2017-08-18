import React, { Component } from 'react';
import Dropzone from 'react-dropzone'


export default class App extends Component {
  onDrop(files) {
      this.props.fileDrop(files)
  }

  render() {
    const { VATs, fieldtext, file, loading } = this.props.pdf;

    return (
      <div style={{ textAlign: 'center'}}>
        <input 
            type="text" 
            value={fieldtext} 
            onChange={(e) => this.props.onChange(e.target.value)} 
            placeholder="VAT to exclude"
        />

        <Dropzone onDrop={(files) => this.props.fileDrop(files[0])}>
            <p> Drag and drop files </p>
            {(file) ?
                <p>{this.props.pdf.file.name}</p>
            : false}
        </Dropzone>

        {loading ?
            <p>...Files are uploaded and analysed...</p>
        : false}

        {(VATs && VATs.length === 0)?
            <p>No VAT found on this file</p>
        : false}

        {(VATs && VATs.length > 0) ?
                <div>
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
