export default class LazyLoad {

    constructor(options) {

        const defaultOptions = {
            elements: ['.lazyload', '.lazy'],
            offset: '0px 0px 0px 0px',
            placeholder: 'https://via.placeholder.com/1/1'
        };

        this.options = {
            ...defaultOptions,
            ...options
        }

        this.init();
    }

    init() {
        this.elements = document.querySelectorAll(this.options.elements);

        this.elements.forEach(image => 
            {
                image.src = this.options.placeholder;
                image.style.width = '100%';
                
                image.addEventListener('click', e => {
                    this.lazyload(e.currentTarget);
                })
            }
        );
    }

    lazyload(image) {
        image.src = image.dataset.src;
    }
}