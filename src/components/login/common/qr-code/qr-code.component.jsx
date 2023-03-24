import './qr-code.css'
import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';

const QRCode = ({ ...value }) => {
    return <div className='qr-code-container'>
        <QRCodeSVG className='hey' value={value} />
    </div>
}

export default QRCode;