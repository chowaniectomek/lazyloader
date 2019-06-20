class LazyLoad {

    constructor(customOptions) {

        if(!LazyLoad.instance) {

            const defaultOptions = {
                elements: ['.lazyload', '.lazy'],
                placeholder: 'https://via.placeholder.com/1/1',
                offset: '0px 0px 0px 0px',
            };
    
            this.options = {
                ...defaultOptions,
                ...customOptions
            }

            LazyLoad.instance = this;

        }

        return LazyLoad.instance;
        
    }

    init() {

        const onIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    entry.target.src = entry.target.dataset.src;
                }
            })
        }
        
        let observer = new IntersectionObserver(onIntersection, {rootMargin : this.options.offset});

        this.elements = document.querySelectorAll(this.options.elements);

        this.elements.forEach(image => 
            {
                image.src = this.options.placeholder;
                image.style.width = '100%';
                observer.observe(image);
            }
        );
    }

}

const instance = (options) => {
    const ll = new LazyLoad(options);
    ll.init();
    // Object.freeze(ll);
    return ll;
}

export default instance;