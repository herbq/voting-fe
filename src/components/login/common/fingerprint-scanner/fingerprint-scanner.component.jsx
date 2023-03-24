import "./fingerprint-scanner.css";

const FingerprintScanner = ({submitFingerprint}) => {
  console.log(`init`)
  return (
    <div onLoad={(e) => {
      let element = e.target.offsetParent.offsetParent;
      element.classList.add('fade-in')
    }} className="fingerprint-scanner-container">
      <div onClick={(e) => {
        let element = e.target.offsetParent.offsetParent;
        element.classList.remove('fade-in')
        element.classList.add('fade-out')
        submitFingerprint(1);
      }} className="fingerprint-scanner">
        <img src="https://pngimg.com/uploads/fingerprint/fingerprint_PNG98.png" alt="fingerprint" />
        <p>Please scan your fingerprint</p>
      </div>
    </div>
  );
};

export default FingerprintScanner;
