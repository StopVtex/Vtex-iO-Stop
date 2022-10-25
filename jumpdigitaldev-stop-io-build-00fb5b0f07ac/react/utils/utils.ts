export const resizeImage = ( elementImage: any ) => {
    if ( elementImage && !elementImage.classList.contains('change-image')) {
        elementImage.classList.add('change-image');
        let src = elementImage.getAttribute('src') as string;
        src = src.substr(0, src.search(/-\d+-/));
        elementImage.setAttribute('src', src);
    }
}