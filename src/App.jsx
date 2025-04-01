function MainApp() {
    return (
        <div>
            <div className='container col d-flex flex-column align-items-center justify-content-center'>
                <div className="title mb-4">
                    <img src={reactLogo} alt="React Logo" className="img-fluid" />
                </div>
                <div className='d-lg-block mb-3'> {/* Changed from d-none d-lg-block */}
                    <DragAndDrop />
                </div>
                <div className='scan-button-desktop d-lg-block d-none'> {/* Added this line */}
                    <ScanButton label="Scan" />
                </div>
                <div className='d-lg-none d-block'>
                    <ScanButton label="Scan" />
                </div>
                {/* Rest of your component remains the same */}
            </div>
        </div>
    );
}