class App {
    constructor() {
        setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        let count = 0;
        $('.userContentWrapper').forEach(node => {
            const element = $(node);
            const target = element.find('[id^=feed_sub_title]');
            const text = this.getElementText(target);
            const hasSponsoredText = this.textContains('sponsored', text);
            if (hasSponsoredText) {
                element.remove();
                count++;
            }
        });
        if (count > 0) {
            console.log(`Removed ${count} ads`);
        }
    }

    textContains(needle = '', haystack) {
        let index = 0;
        const filtered = haystack
            .toLowerCase()
            .split('')
            .reduce((prev, current) => {
                if (current === needle[index]) {
                    index++;
                    return prev + current;
                }
                return prev;
            }, '');
        return filtered === needle;
    }

    getElementText(selector, text = '') {
        const element = $(selector);
        const nodes = element.children();

        if (nodes.length > 0) {
            text += nodes
                .map((index, node) => this.getElementText(node, text))
                .reduce((prev, current) => prev + current, '');
        } else {
            text += element.text();
        }
        return text;
    }
}

new App();
