import React from 'react';
// import './ImageGrid.css';
// Make sure to create this file

const images = [
    { src: 'assets/images/place/place-5.jpg', text: 'Text 1', link: '/link1' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 2', link: '/link2' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 3', link: '/link3' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 4', link: '/link4' },
];

const ImageGrid = () => {
    return (
        <div className="image-grid">
            {images.map((img, index) => (
                <a href={img.link} className="image-item" key={index}>
                    <img src={img.src} alt={`Image ${index + 1}`} />
                    <div className="overlay-text">
                        <h2 className="even-head">{img.text}</h2>
                        <p className="t-white event-p-line mt-7 mb-10">
                            Pharetra venenatis ante pulvinar fermentum dignissim one malesuada
                        </p>
                        <div className="event-btn">View More</div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ImageGrid;
