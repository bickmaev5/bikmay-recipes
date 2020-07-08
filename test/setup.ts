import 'jest-styled-components';
// import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
window.matchMedia = window.matchMedia || function matchMedia() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
};


const resizeEvent = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);
