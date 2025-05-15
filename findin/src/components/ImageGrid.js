import React from 'react';

const images = [
    { src: 'assets/images/place/place-5.jpg', text: 'Text 1', link: '/link1' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 2', link: '/link2' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 3', link: '/link3' },
    { src: 'assets/images/place/place-5.jpg', text: 'Text 4', link: '/link4' },
];

const ImageGrid = () => {
    return (
        <div className="image-row">
            {images.map((img, index) => (
                <a href={img.link} className="image-container" key={index}>
                    <img src={img.src} alt={`Image ${index + 1}`} />
                    <div className="overlay-text">{img.text}</div>
                </a>
            ))}
        </div>
    );
};

export default ImageGrid;
